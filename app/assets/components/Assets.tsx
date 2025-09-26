'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GET_ALL_CREATORS_QUERY } from '@/packages/gql/api/adminAPI';
import { ExtendedUsersEntity } from '@/packages/gql/generated/graphql';
import { useQuery } from '@apollo/client/react';
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { AssetCards } from './AssetCards';

export const Assets = () => {
  const [hasNext, setHasNext] = useState<boolean>(true);
  const { data: creators, fetchMore, refetch } = useQuery(GET_ALL_CREATORS_QUERY, { variables: { input: { limit: 30 } } });

  const handleLoadMore = async () => {
    const { data: newCreators } = await fetchMore({
      variables: { input: { limit: 30, offset: creators?.getCreatorsByAdmin.creators.length } },
      updateQuery(previousQueryResult, { fetchMoreResult }) {
        return {
          getCreatorsByAdmin: {
            count: previousQueryResult.getCreatorsByAdmin.count,
            creators: [...previousQueryResult.getCreatorsByAdmin.creators, ...fetchMoreResult.getCreatorsByAdmin.creators]
          }
        };
      }
    });
    setHasNext(!!newCreators?.getCreatorsByAdmin.creators.length);
  };

  const handleRefetch = async () => {
    await refetch();
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between sticky top-15 bg-background z-10 py-2 px-2 border-b">
        <div className="flex flex-row space-x-2 items-center">
          <Button variant="secondary">{10} Creators</Button>
        </div>
        <div className="flex flex-row space-x-2">
          <Button variant="outline" className="ml-auto hover:scale-105 transition-transform" onClick={handleRefetch}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {creators?.getCreatorsByAdmin.creators.length ? (
        <ScrollArea className="overflow-y-auto h-[calc(100vh-140px)] w-full p-4">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {creators.getCreatorsByAdmin.creators.map((creator) => (
              <div
                key={creator.id}
                className="relative rounded-2xl overflow-hidden shadow-lg border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 hover:shadow-[0_0_25px_4px_rgba(34,197,94,0.6)] transition-all group"
              >
                <AssetCards creator={creator as ExtendedUsersEntity} />
              </div>
            ))}
          </div>

          {hasNext ? (
            <div className="flex items-center justify-center mt-6">
              <Button variant="outline" size="sm" className="hover:shadow-[0_0_20px_2px_rgba(59,130,246,0.6)]" onClick={handleLoadMore}>
                Load More
              </Button>
            </div>
          ) : (
            <div className="text-center tracking-tight py-4 text-muted-foreground">
              <p>✨ Looks like you’ve reached the end! ✨</p>
            </div>
          )}
        </ScrollArea>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Looks like there is nothing here 🚀</p>
        </div>
      )}
    </div>
  );
};
