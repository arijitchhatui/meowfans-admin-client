import { TerminateDownloadingModal } from '@/components/modals/TerminateDownloadingModal';
import { TerminateImportingJobsModal } from '@/components/modals/TerminateImportingJobsModal';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GET_ALL_CREATORS_QUERY } from '@/packages/gql/api/adminAPI';
import { ExtendedUsersEntity } from '@/packages/gql/generated/graphql';
import { Div } from '@/wrappers/HTMLWrappers';
import { useQuery } from '@apollo/client/react';
import { ArrowBigDown, RefreshCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { VaultUrls } from './VaultUrls';

export const Vaults = () => {
  const endRef = useRef<HTMLDivElement>(null);
  const [hasNext, setHasNext] = useState<boolean>(false);

  const { data, refetch, fetchMore, loading } = useQuery(GET_ALL_CREATORS_QUERY, {
    variables: {
      input: { limit: 100, offset: 0 }
    }
  });

  const [dataLength, setDataLength] = useState<number>(data?.getCreatorsByAdmin.creators.length || 0);

  const handleRefetch = async () => {
    await refetch();
  };

  const handleScrollToTheEnd = () => {
    requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    });
  };

  const handleFetchMore = async () => {
    const { data: newData } = await fetchMore({
      variables: {
        input: {
          offset: data?.getCreatorsByAdmin.creators.length,
          limit: 100
        }
      },
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
        </Div>
      </Div>
      {data?.getCreatorsByAdmin.creators.length ? (
        <div className="relative">
          <ScrollArea className="overflow-y-auto h-[calc(100vh-140px)] w-full p-1">
            {data?.getCreatorsByAdmin.creators.map((creator, idx) => (
              <Div key={idx} className="flex flex-col rounded-md border my-1 p-2">
                <VaultUrls idx={idx} creator={creator as ExtendedUsersEntity} />
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
            className="cursor-pointer absolute bottom-4 right-4 rounded-full z-50 shadow-lg"
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
