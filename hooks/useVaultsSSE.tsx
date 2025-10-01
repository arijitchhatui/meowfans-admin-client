'use client';

import { useEffect, useState, useCallback } from 'react';
import { configService } from '@/util/config';
import { DownloadStates } from '@/packages/gql/generated/graphql';
import { EventTypes } from '@/lib/constants';

interface VaultSSEEvent {
  status?: DownloadStates;
  objectId?: string;
  creatorId?: string;
  message?: string;
}

interface VaultsState {
  pending: number;
  processing: number;
  fulfilled: number;
  rejected: number;
  lastEvent?: VaultSSEEvent;
  completed?: boolean;
}

export const useVaultsSSE = (creatorId: string) => {
  const [state, setState] = useState<VaultsState>({
    pending: 0,
    processing: 0,
    fulfilled: 0,
    rejected: 0,
  });

  const reset = useCallback(() => {
    setState({
      pending: 0,
      processing: 0,
      fulfilled: 0,
      rejected: 0,
    });
  }, []);

  useEffect(() => {
    if (!creatorId) return;

    const es = new EventSource(`${configService.NEXT_PUBLIC_API_URL}/stream` );

    es.addEventListener(EventTypes.ImportObject, (event) => {
      const { data } = JSON.parse((event as MessageEvent).data);
      setState((prev) => ({
        ...prev,
        pending: prev.pending + (data.status === DownloadStates.Pending ? 1 : 0),
        lastEvent: data,
      }));
    });

    es.addEventListener(EventTypes.VaultDownload, (event) => {
      const { data } = JSON.parse((event as MessageEvent).data);
      setState((prev) => {
        let updates: Partial<VaultsState> = {};
        switch (data.status) {
          case DownloadStates.Processing:
            updates = { processing: prev.processing + 1 };
            break;
          case DownloadStates.Fulfilled:
            updates = {
              fulfilled: prev.fulfilled + 1,
              processing: Math.max(prev.processing - 1, 0),
              pending: Math.max(prev.pending - 1, 0),
            };
            break;
          case DownloadStates.Rejected:
            updates = {
              rejected: prev.rejected + 1,
              processing: Math.max(prev.processing - 1, 0),
              pending: Math.max(prev.pending - 1, 0),
            };
            break;
        }
        return { ...prev, ...updates, lastEvent: data };
      });
    });

    es.addEventListener(EventTypes.VaultDownloadCompleted, (event) => {
      const { data } = JSON.parse((event as MessageEvent).data);
      setState((prev) => ({
        ...prev,
        completed: true,
        lastEvent: data,
      }));
    });

    return () => es.close();
  }, [creatorId]);

  return { state, reset };
};
