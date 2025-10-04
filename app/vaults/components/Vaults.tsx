'use client';

import { TerminateDownloadingModal } from '@/components/modals/TerminateDownloadingModal';
import { TerminateImportingJobsModal } from '@/components/modals/TerminateImportingJobsModal';
import { Paginate } from '@/components/Paginate';
import { ScrollToTheBottom } from '@/components/ScrollToTheBottom';
import { ScrollToTheTop } from '@/components/ScrollToTheTop';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GET_ALL_CREATORS_QUERY } from '@/packages/gql/api/adminAPI';
import { DownloadStates, ExtendedUsersEntity, GetAllCreatorsOutput, GetCreatorsByAdminQuery } from '@/packages/gql/generated/graphql';
import { handleScrollToTheEnd, handleScrollToTheTop } from '@/util/helpers';
import { Div } from '@/wrappers/HTMLWrappers';
import { PageWrapper } from '@/wrappers/PageWrapper';
import { useQuery } from '@apollo/client/react';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { VaultsHeader } from './VaultsHeader';
import { VaultUrls } from './VaultUrls';

export const Vaults = () => {
  const searchParams = useSearchParams();
  const endRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [filterBy, setFilterBy] = useState<DownloadStates>(DownloadStates.Pending);
  const [selectedCreatorIds, setSelectedCreatorIds] = useState<string[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get('p') || 1));
  const { data, refetch, updateQuery } = useQuery(GET_ALL_CREATORS_QUERY, { variables: { input: { take: 100, pageNumber } } });

  const {
    count = 0,
    creators = [],
    hasNext = false,
    hasPrev = false,
    totalPages = 0
  } = (data?.getCreatorsByAdmin ?? {}) as GetAllCreatorsOutput;
  const creatorVaults = creators as ExtendedUsersEntity[];

  const handleRefetch = async () => {
    await refetch({ input: { take: 100, pageNumber } });
  };

  const toggleCreatorSelection = (creatorId: string) => {
    setSelectedCreatorIds((prev) => (prev.includes(creatorId) ? prev.filter((id) => id !== creatorId) : [...prev, creatorId]));
  };

  const handleSelectN = (n: number) => {
    const ids = creatorVaults
      .filter((v) => v.pendingObjectCount !== 0)
      .slice(0, n)
      .map((v) => v.id);
    setSelectedCreatorIds(ids);
  };

  const filteredVaults = filterText
    ? creatorVaults.filter(
        (c) => c.id.toLowerCase().includes(filterText.toLowerCase()) || (c.username ?? '').includes(filterText.toLowerCase())
      )
    : creatorVaults;

  const handleSortVaults = (a: ExtendedUsersEntity, b: ExtendedUsersEntity) => {
    switch (filterBy) {
      case DownloadStates.Rejected:
        return b.rejectedObjectCount - a.rejectedObjectCount;
      case DownloadStates.Pending:
        return b.pendingObjectCount - a.pendingObjectCount;
      case DownloadStates.Processing:
        return b.processingObjectCount - a.processingObjectCount;
      case DownloadStates.Fulfilled:
        return b.fulfilledObjectCount - a.fulfilledObjectCount;
      default:
        return b.pendingObjectCount - a.pendingObjectCount;
    }
  };

  return (
    <PageWrapper className="w-full">
      <VaultsHeader
        setSelectedCreatorIds={setSelectedCreatorIds}
        onRefetch={handleRefetch}
        onSelectN={handleSelectN}
        filterBy={filterBy}
        count={count}
        onFilter={setFilterText}
        filteredVaults={filteredVaults}
        selectedCreatorIds={selectedCreatorIds}
        onFilterBy={(stats) => setFilterBy(stats)}
      />
      {filteredVaults && filteredVaults.length ? (
        <div className="relative h-full">
          <ScrollArea className="h-[calc(100vh-140px)] w-full p-1">
            <div ref={topRef} />
            {filteredVaults
              .slice()
              .sort((a, b) => handleSortVaults(a, b))
              .map((creator, idx) => (
                <Div key={creator.id ?? idx} className="flex flex-col rounded-md border my-1 p-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      checked={selectedCreatorIds.includes(creator.id)}
                      onCheckedChange={() => toggleCreatorSelection(creator.id)}
                    />
                    <span className="text-sm">{creator.id}</span>
                  </div>
                  <VaultUrls
                    idx={idx}
                    creator={creator}
                    onJobAdded={handleRefetch}
                    onUpdateCreator={(updated) =>
                      updateQuery((prev) => {
                        if (!prev?.getCreatorsByAdmin) return prev as GetCreatorsByAdminQuery;

                        return {
                          getCreatorsByAdmin: {
                            ...prev.getCreatorsByAdmin,
                            creators:
                              prev.getCreatorsByAdmin.creators &&
                              prev.getCreatorsByAdmin.creators.map((c) => (c && c.id === updated.id ? updated : c)),
                            count: prev.getCreatorsByAdmin.count
                          }
                        } as GetCreatorsByAdminQuery;
                      })
                    }
                  />
                </Div>
              ))}
            <div ref={endRef} />
          </ScrollArea>
          <ScrollToTheTop onClick={() => handleScrollToTheTop(topRef)} />
          <ScrollToTheBottom onClick={() => handleScrollToTheEnd(endRef)} />
          <Paginate hasNext={hasNext} hasPrev={hasPrev} pageNumber={pageNumber} totalPages={totalPages} setPageNumber={setPageNumber} />
        </div>
      ) : (
        <Div className="text-center">
          <p>✨Looks like there is nothing here✨</p>
        </Div>
      )}

      <TerminateImportingJobsModal />
      <TerminateDownloadingModal />
    </PageWrapper>
  );
};
