'use client';
import { EventTypes } from '@/lib/constants';
import { Exact, GetCountOfObjectsOfEachTypeQuery, GetCreatorsByAdminQuery, PaginationInput } from '@/packages/gql/generated/graphql';
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
    const { creatorId, data } = JSON.parse(event.detail);

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
                    fulfilledObjectCount: data.status === 'FULFILLED' ? (c.fulfilledObjectCount ?? 0) + 1 : c.fulfilledObjectCount,
                    rejectedObjectCount: data.status === 'REJECTED' ? (c.rejectedObjectCount ?? 0) + 1 : c.rejectedObjectCount,
                    pendingObjectCount: Math.max((c.pendingObjectCount ?? 0) - 1, 0),
                    processingObjectCount:
                      data.status === 'PROCESSING' ? (c.processingObjectCount || 0) + 1 : Math.max((c.processingObjectCount || 0) - 1, 0)
                  }
                : c
            ),
          count: prev.getCreatorsByAdmin.count
        }
      } as GetCreatorsByAdminQuery;
    });
  };

  const onImportCompleted = (event: CustomEvent) => {
    const { data } = JSON.parse(event.detail);
    toast.success('Streaming is off!', {
      description: data.finalMessage,
      closeButton: true,
      position: 'bottom-center'
    });
  };

  const onVaultDownloadCompleted = (event: CustomEvent) => {
    const { data } = JSON.parse(event.detail);
    toast.success('Vault download operation', {
      description: data.finalMessage,
      closeButton: true,
      position: 'bottom-center'
    });
  };

  const onImportObjectOrVaultDownload = (event: CustomEvent) => {
    const { data } = JSON.parse(event.detail);
    updateAllObjectsCount?.((prev) => {
      return {
        ...prev,
        getCountOfObjectsOfEachType: {
          ...prev.getCountOfObjectsOfEachType,
          fulfilled:
            data.status === 'FULFILLED'
              ? (prev.getCountOfObjectsOfEachType?.fulfilled || 0) + 1
              : prev.getCountOfObjectsOfEachType?.fulfilled,
          rejected:
            data.status === 'REJECTED' ? (prev.getCountOfObjectsOfEachType?.rejected || 0) + 1 : prev.getCountOfObjectsOfEachType?.rejected,
          pending:
            data.status === 'PENDING'
              ? Math.max((prev.getCountOfObjectsOfEachType?.pending ?? 0) + 1, 0)
              : prev.getCountOfObjectsOfEachType?.pending,
          processing:
            data.status === 'PROCESSING'
              ? (prev.getCountOfObjectsOfEachType?.processing || 0) + 1
              : Math.max((prev.getCountOfObjectsOfEachType?.processing ?? 0) - 1, 0)
        }
      } as GetCountOfObjectsOfEachTypeQuery;
    });
  };

  useEffect(() => {
    window.addEventListener(EventTypes.VaultDownload, (e) => onUpdateCreatorsByAdminQuery(e as any));
    window.addEventListener(EventTypes.VaultDownloadCompleted, (event) => onVaultDownloadCompleted(event as any));
    window.addEventListener(EventTypes.VaultDownload, (event) => onImportObjectOrVaultDownload(event as any));
    window.addEventListener(EventTypes.ImportObject, (event) => onImportObjectOrVaultDownload(event as any));
    window.addEventListener(EventTypes.ImportCompleted, (event) => onImportCompleted(event as any));
  }, []); //eslint-disable-line
  return null;
};
