'use client';

import { Paginate } from '@/components/Paginate';
import { ScrollToTheBottom } from '@/components/ScrollToTheBottom';
import { ScrollToTheTop } from '@/components/ScrollToTheTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GET_ALL_CREATORS_QUERY } from '@/packages/gql/api/adminAPI';
import { ExtendedUsersEntity, GetAllCreatorsOutput } from '@/packages/gql/generated/graphql';
import { handleScrollToTheEnd, handleScrollToTheTop } from '@/util/helpers';
import { PageWrapper } from '@/wrappers/PageWrapper';
import { useQuery } from '@apollo/client/react';
import { RefreshCcw, Search, Shield } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { AssetCards } from './AssetCards';

export const Assets = () => {
  const searchParams = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(Number(searchParams.get('p') || 1));
  const { data, refetch } = useQuery(GET_ALL_CREATORS_QUERY, { variables: { input: { take: 100, pageNumber } } });
  const [filterText, setFilterText] = useState<string>('');
  const endRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const {
    count = 0,
    creators = [],
    hasNext = false,
    hasPrev = false,
    totalPages = 0
  } = (data?.getCreatorsByAdmin ?? {}) as GetAllCreatorsOutput;

  const filteredCreators = filterText
    ? creators.filter(
        (c) =>
          c.id.toLowerCase().includes(filterText.toLowerCase()) ||
          (c.firstName?.toLowerCase() ?? '').includes(filterText.toLowerCase()) ||
          (c.username?.toLowerCase() ?? '').includes(filterText.toLowerCase())
      )
    : creators;

  const handleRefetch = async () => {
    await refetch();
  };

  return (
    <PageWrapper className="w-full">
      <div className="flex flex-col justify-between sticky bg-background z-10 py-3 space-y-1 px-4 border-b shadow-sm">
        <div className="flex flex-row items-center gap-3">
          <Button variant="secondary" className="rounded-full">
            <Shield className="h-4 w-4 mr-1" /> {count} Creators
          </Button>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search creators..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="pl-8 max-w-sm"
            />
          </div>
        </div>
        <div className="w-full flex">
          <Button variant="outline" className="hover:scale-105 transition-transform rounded-full" onClick={handleRefetch}>
            <RefreshCcw className="h-4 w-4 mr-1" /> Refresh
          </Button>
        </div>
      </div>

      {filteredCreators && filteredCreators.length ? (
        <div className="relative h-full">
          <ScrollArea className="h-[calc(100vh-150px)] w-full p-4">
            <div ref={topRef} />
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCreators
                .slice()
                .sort((a, b) => b.assetCount - a.assetCount)
                .map((creator, idx) => (
                  <AssetCards key={creator.id ?? idx} creator={creator as ExtendedUsersEntity} pageNumber={pageNumber} />
                ))}
            </div>
            <div ref={endRef} />
          </ScrollArea>

          <ScrollToTheTop onClick={() => handleScrollToTheTop(topRef)} />
          <ScrollToTheBottom onClick={() => handleScrollToTheEnd(endRef)} />
          <Paginate hasNext={hasNext} hasPrev={hasPrev} pageNumber={pageNumber} totalPages={totalPages} setPageNumber={setPageNumber} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
          <p>No creators found</p>
        </div>
      )}
    </PageWrapper>
  );
};
