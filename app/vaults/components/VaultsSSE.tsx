'use client';
import { EventTypes } from '@/lib/constants';
import { Exact, GetCountOfObjectsOfEachTypeQuery, GetCreatorsByAdminQuery, PaginationInput } from '@/packages/gql/generated/graphql';
import { eventEmitter } from '@/util/EventsEmitter';
import { UpdateQueryMapFn } from '@apollo/client';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface Props {
  updateCreatorsByAdminQuery?: (
    mapFn: UpdateQueryMapFn<
      GetCreatorsByAdminQuery,
      Exact<{
        input: PaginationInput;
      }>
    >
  ) => void;
  updateAllObjectsCount?: (mapFn: UpdateQueryMapFn<GetCountOfObjectsOfEachTypeQuery, Exact<{ [key: string]: never }>>) => void;
}

export const VaultsSSE: React.FC<Props> = ({ updateAllObjectsCount, updateCreatorsByAdminQuery }) => {
  const onUpdateCreatorsByAdminQuery = (event: CustomEvent) => {
    const { creatorId, data } = event.detail;

    updateCreatorsByAdminQuery?.((prev) => {
      if (!prev?.getCreatorsByAdmin) return prev as GetCreatorsByAdminQuery;

      return {
        getCreatorsByAdmin: {
          ...prev.getCreatorsByAdmin,
          creators:
            prev.getCreatorsByAdmin.creators &&
            prev.getCreatorsByAdmin.creators.map((c) =>
              c && c.id === creatorId
                ? {
                    ...c,
                    fulfilledObjectCount: data.fulfilled,
                    rejectedObjectCount: data.rejected,
                    pendingObjectCount: data.pending,
                    processingObjectCount: data.processing
                  }
                : c
            ),
          count: prev.getCreatorsByAdmin.count
        }
      } as GetCreatorsByAdminQuery;
    });
  };

  const onImportCompleted = (event: CustomEvent) => {
    const { data } = event.detail;
    toast.success('Streaming is off!', {
      description: data.finalMessage,
      closeButton: true,
      position: 'bottom-center'
    });
  };

  const onVaultDownloadCompleted = (event: CustomEvent) => {
    const { data } = event.detail;
    toast.success('Vault download operation', {
      description: data.finalMessage,
      closeButton: true,
      position: 'bottom-center'
    });
  };

  const onImportObjectOrVaultDownload = (event: CustomEvent) => {
    const { data } = event.detail;
    updateAllObjectsCount?.((prev) => {
      return {
        ...prev,
        getCountOfObjectsOfEachType: {
          ...prev.getCountOfObjectsOfEachType,
          fulfilled: data.fulfilled,
          rejected: data.rejected,
          pending: data.pending,
          processing: data.processing
        }
      } as GetCountOfObjectsOfEachTypeQuery;
    });
  };

  useEffect(() => {
    eventEmitter.addEventListener(EventTypes.VaultDownload, (event) => onUpdateCreatorsByAdminQuery(event as any));
    eventEmitter.addEventListener(EventTypes.VaultDownloadCompleted, (event) => onVaultDownloadCompleted(event as any));
    eventEmitter.addEventListener(EventTypes.VaultDownload, (event) => onImportObjectOrVaultDownload(event as any));
    eventEmitter.addEventListener(EventTypes.ImportObject, (event) => onImportObjectOrVaultDownload(event as any));
    eventEmitter.addEventListener(EventTypes.ImportCompleted, (event) => onImportCompleted(event as any));

    return () => {
      eventEmitter.removeEventListener(EventTypes.VaultDownload, (event) => onUpdateCreatorsByAdminQuery(event as any));
      eventEmitter.removeEventListener(EventTypes.VaultDownloadCompleted, (event) => onVaultDownloadCompleted(event as any));
      eventEmitter.removeEventListener(EventTypes.VaultDownload, (event) => onImportObjectOrVaultDownload(event as any));
      eventEmitter.removeEventListener(EventTypes.ImportObject, (event) => onImportObjectOrVaultDownload(event as any));
      eventEmitter.removeEventListener(EventTypes.ImportCompleted, (event) => onImportCompleted(event as any));
    };
  }, []); //eslint-disable-line
  return null;
};
