import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GET_ALL_CREATORS_QUERY } from '@/packages/gql/api/adminAPI';
import { ExtendedUsersEntity } from '@/packages/gql/generated/graphql';
import { PageWrapper } from '@/wrappers/PageWrapper';
import { useQuery } from '@apollo/client/react';
import { CreatorProfilesArea } from './CreatorProfilesArea';

export const CreatorProfiles = () => {
  const { data } = useQuery(GET_ALL_CREATORS_QUERY, { variables: { input: { limit: 30 } } });
  return (
    <PageWrapper className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-zinc-900 dark:to-black p-6 ">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">📊 Creator Management</h1>
        <p className="text-gray-600 dark:text-gray-400"> Manage all creators, edit profiles, and access analytics. </p>
      </header>
      <section id="creators">
        <h2 className="text-2xl font-semibold mb-6">All Creators</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.getCreatorsByAdmin.creators.map((creator) => (
            <div key={creator.id} className="hover:shadow-lg transition rounded-2xl overflow-auto relative">
              <CreatorProfilesArea creator={creator as ExtendedUsersEntity} />
            </div>
          ))}
        </div>
      </section>
      <Separator className="my-16" />
    </PageWrapper>
  );
};
