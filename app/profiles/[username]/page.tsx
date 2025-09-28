import { GET_USER_QUERY } from '@/packages/gql/api/userAPI';
import { getClient } from '@/packages/gql/ApolloClient';
import { GetUserQuery } from '@/packages/gql/generated/graphql';
import CreatorProfile from './components/CreatorProfile';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function CreatorProfilePage({ params }: Props) {
  const client = await getClient();
  const { data } = await client.query({ query: GET_USER_QUERY, variables: { username: (await params).username } });

  return <CreatorProfile creator={data as GetUserQuery} />;
}
