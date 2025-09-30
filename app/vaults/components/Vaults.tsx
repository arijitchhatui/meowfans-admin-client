'use client';

import { TerminateDownloadingModal } from '@/components/modals/TerminateDownloadingModal';
import { TerminateImportingJobsModal } from '@/components/modals/TerminateImportingJobsModal';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useExtendedUsersContextVaults } from '@/hooks/context/ExtendedUsersContext';
import { EventTypes } from '@/lib/constants';
import { GET_ALL_CREATORS_QUERY } from '@/packages/gql/api/adminAPI';
import { GET_TOTAL_VAULT_OBJECTS_COUNT_BY_TYPE_QUERY } from '@/packages/gql/api/vaultsAPI';
import { DownloadStates, ExtendedUsersEntity } from '@/packages/gql/generated/graphql';
import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { Div } from '@/wrappers/HTMLWrappers';
import { useLazyQuery, useQuery } from '@apollo/client/react';
import { ArrowBigDown, Ban, CheckLine, ListTodo, LoaderIcon, RefreshCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { VaultUrls } from './VaultUrls';

const statusLabels: Record<DownloadStates, string> = {
  [DownloadStates.Fulfilled]: 'Total downloaded objects',
  [DownloadStates.Pending]: 'Total pending objects',
  [DownloadStates.Processing]: 'Total processing objects',
  [DownloadStates.Rejected]: 'Total rejected objects'
};

const statusButtons = [
  {
    className: 'text-xs font-medium bg-blue-500 text-white',
    status: DownloadStates.Fulfilled,
    icon: <CheckLine />
  },
  {
    className: 'text-xs font-medium animate-pulse',
    status: DownloadStates.Pending,
    icon: <ListTodo />
  },
  {
    className: 'text-xs font-medium bg-orange-500 text-white dark:bg-emerald-400',
    status: DownloadStates.Processing,
    icon: <LoaderIcon />
  },
  {
    className: 'text-xs font-medium bg-red-500 text-white dark:bg-red-600',
    status: DownloadStates.Rejected,
    icon: <Ban />
  }
];
export const Vaults = () => {
  const endRef = useRef<HTMLDivElement>(null);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [getCountOfObjects] = useLazyQuery(GET_TOTAL_VAULT_OBJECTS_COUNT_BY_TYPE_QUERY);
  const { data, refetch, fetchMore, loading } = useQuery(GET_ALL_CREATORS_QUERY, { variables: { input: { limit: 100, offset: 0 } } });
  const [dataLength, setDataLength] = useState<number>(data?.getCreatorsByAdmin.creators.length || 0);
  const { creatorVaults, setCreatorVaults } = useExtendedUsersContextVaults();
  const hasProcessing = creatorVaults.some((creatorVault) => creatorVault.processingObjectCount > 0);

  const handleRefetch = async () => {
    const { data } = await refetch();
    setCreatorVaults(data?.getCreatorsByAdmin.creators as ExtendedUsersEntity[]);
  };

  const handleGetCountOfObjects = async (status: DownloadStates) => {
    try {
      toast.loading('Fetching latest count...');
      const { data } = await getCountOfObjects({ variables: { input: { status } } });
      toast.dismiss();
      toast.success(data?.getTotalObjectsAsType, {
        description: statusLabels[status]
      });
      return data?.getTotalObjectsAsType;
    } catch {
      toast.dismiss();
      toast.error('Something wrong happened!');
    }
  };

  const handleScrollToTheEnd = () => {
    requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    });
  };

  const handleFetchMore = async () => {
    const { data: newData } = await fetchMore({
      variables: { input: { offset: creatorVaults?.length, limit: 100 } },

      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousQueryResult;
        return {
          getCreatorsByAdmin: {
            ...previousQueryResult.getCreatorsByAdmin,
            vaultObjects: [...previousQueryResult.getCreatorsByAdmin.creators, ...fetchMoreResult.getCreatorsByAdmin.creators],
            count: fetchMoreResult.getCreatorsByAdmin.count || 0
          }
        };
      }
    });

    setHasNext(!!newData?.getCreatorsByAdmin.creators.length);
    setDataLength(data?.getCreatorsByAdmin.count || 0);
  };

  useEffect(() => {
    if (!hasProcessing) return;

    const es = new EventSource(buildSafeUrl({ host: configService.NEXT_PUBLIC_API_URL, pathname: '/sse/stream' }));
    es.onopen = () => {
      toast.success('SSE connection opened.');
    };

    es.addEventListener(EventTypes.VaultDownload, (event) => {
      const { creatorId, data } = JSON.parse(event.data);
      setCreatorVaults((prev) =>
        prev.map((creator) =>
          creator.id === creatorId
            ? {
                ...creator,
                fulfilledObjectCount: data.status === 'FULFILLED' ? creator.fulfilledObjectCount + 1 : creator.fulfilledObjectCount,
                rejectedObjectCount: data.status === 'REJECTED' ? creator.rejectedObjectCount + 1 : creator.rejectedObjectCount,
                pendingObjectCount: data.status === 'PENDING' ? creator.pendingObjectCount + 1 : creator.pendingObjectCount,
                processingObjectCount: creator.processingObjectCount - 1
              }
            : creator
        )
      );
    });

    es.addEventListener(EventTypes.ImportObject, (event) => {

    })

    es.addEventListener(EventTypes.ImportCompleted, (event) => {
      const { data } = JSON.parse(event.data);
      toast.success('Streaming is off!', {
        description: data.finalMessage,
        closeButton: true,
        position: 'bottom-center'
      });
    });

    es.addEventListener(EventTypes.VaultDownloadCompleted, (event) => {
      const { data } = JSON.parse(event.data);
      toast.success('Streaming is off!', {
        description: data.finalMessage,
        closeButton: true,
        position: 'bottom-center'
      });
      es.close();
    });

    es.onerror = (error) => {
      console.error('SSE Error:', error);
      es.close();
    };
    return () => es.close();
  }, [hasProcessing]); //eslint-disable-line

  // useEffect(() => {
  //   if (data?.getCreatorsByAdmin.creators.length) {
  //     setCreatorVaults(data.getCreatorsByAdmin.creators as ExtendedUsersEntity[]);
  //   }
  // }, [data]); //eslint-disable-line

  useEffect(() => {
    setDataLength(data?.getCreatorsByAdmin.count || 0);
  }, [loading]); //eslint-disable-line

  useEffect(() => {
    setHasNext(true);
  }, []);

  useEffect(() => {
    handleRefetch();
  }, []); //eslint-disable-line

  return (
    <div>
      <Div className="flex items-center justify-between space-x-1 sticky top-15 ">
        <Div className="flex flex-row space-x-2">
          <Button>{dataLength}</Button>
        </Div>
        <Div className="flex flex-row space-x-2">
          <Button variant="outline" className="ml-auto" onClick={handleRefetch}>
            <RefreshCcw />
          </Button>
          {statusButtons.map(({ className, icon, status }, idx) => (
            <Button key={idx} className={className} onClick={() => handleGetCountOfObjects(status)}>
              {icon}
            </Button>
          ))}
        </Div>
      </Div>
      {creatorVaults.length ? (
        <div className="relative">
          <ScrollArea className="overflow-y-auto h-[calc(100vh-140px)] w-full p-1">
            {creatorVaults.map((creator, idx) => (
              <Div key={idx} className="flex flex-col rounded-md border my-1 p-2">
                <VaultUrls
                  idx={idx}
                  creator={creator as ExtendedUsersEntity}
                  onJobAdded={handleRefetch}
                  onUpdateCreator={(updated) => setCreatorVaults((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))}
                />
              </Div>
            ))}
            {hasNext ? (
              <Div className="flex items-center justify-center space-x-2">
                <Div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={handleFetchMore}>
                    Next
                  </Button>
                </Div>
              </Div>
            ) : (
              <Div className="text-center tracking-tight py-4">
                <p>Looks like you have reached at the end!</p>
              </Div>
            )}
            <div ref={endRef} />
          </ScrollArea>
          <Button
            variant={'default'}
            className="cursor-pointer absolute bottom-10 right-4 rounded-full z-50 shadow-lg"
            onClick={handleScrollToTheEnd}
          >
            <ArrowBigDown />
          </Button>
        </div>
      ) : (
        <Div className="text-center">
          <p>Looks like there is nothing here</p>
        </Div>
      )}
      <TerminateImportingJobsModal />
      <TerminateDownloadingModal />
    </div>
  );
};
