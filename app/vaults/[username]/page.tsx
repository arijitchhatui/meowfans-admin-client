import { GET_USER_QUERY } from '@/packages/gql/api/userAPI';
import { getClient } from '@/packages/gql/ApolloClient';
import CreatorVaults from './CreatorVaults';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function CreatorVaultPage({ params }: Props) {
  const client = await getClient();
  const { data } = await client.query({
    query: GET_USER_QUERY,
    variables: { username: (await params).username }
  });
  return <CreatorVaults data={data} />;
}
