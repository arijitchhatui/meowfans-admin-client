'use client';

import { Paginate } from '@/components/Paginate';
import { ScrollToTheBottom } from '@/components/ScrollToTheBottom';
import { ScrollToTheTop } from '@/components/ScrollToTheTop';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GET_ALL_CREATORS_QUERY } from '@/packages/gql/api/adminAPI';
import { ExtendedUsersEntity, GetAllCreatorsOutput } from '@/packages/gql/generated/graphql';
import { handleScrollToTheEnd, handleScrollToTheTop } from '@/util/helpers';
import { PageWrapper } from '@/wrappers/PageWrapper';
import { useQuery } from '@apollo/client/react';
import { RefreshCcw } from 'lucide-react';
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
  const { count = 0, creators = [], hasNext = false, hasPrev = false, totalPages = 0 } = (data?.getCreatorsByAdmin ?? {}) as GetAllCreatorsOutput;

  const filteredVaults = filterText
    ? creators.filter(
        (c) =>
          c.id.toLowerCase().includes(filterText.toLowerCase()) || (c.firstName?.toLowerCase() ?? '').includes(filterText.toLowerCase())
      )
    : creators;

  const handleRefetch = async () => {
    await refetch();
  };

  return (
    <PageWrapper className="w-full">
      <div className="flex items-center justify-between sticky top-15 bg-background z-10 py-2 px-2 border-b">
        <div className="flex flex-row space-x-2 items-center">
          <Button variant="secondary">{count} Creators</Button>
        </div>
        <div className="flex flex-row space-x-2">
          <Button variant="outline" className="ml-auto hover:scale-105 transition-transform" onClick={handleRefetch}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>


      {filteredVaults && filteredVaults.length ? (
        <div className="relative h-full">
          <ScrollArea className="h-[calc(100vh-140px)] w-full p-1">
            <div ref={topRef} />
            <div className='grid gap-6 grid-cols-5'>

            {filteredVaults.map((creator, idx) => (
              <div key={creator.id ?? idx} className="flex flex-row rounded-md border my-1 p-2">
                <AssetCards creator={creator as ExtendedUsersEntity} />
              </div>
            ))}
            </div>
            <div ref={endRef} />
          </ScrollArea>
          <ScrollToTheTop onClick={() => handleScrollToTheTop(topRef)} />
          <ScrollToTheBottom onClick={() => handleScrollToTheEnd(endRef)} />
          <Paginate hasNext={hasNext} hasPrev={hasPrev} pageNumber={pageNumber} totalPages={totalPages} setPageNumber={setPageNumber} />
        </div>
      ) : (
        <div className="text-center">
          <p>Looks like there is nothing here</p>
        </div>
      )}
    </PageWrapper>
  );
};
