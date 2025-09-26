import { GET_USER_QUERY } from '@/packages/gql/api/userAPI';
import { getClient } from '@/packages/gql/ApolloClient';
import { CreatorAssets } from './components/CreatorAssets';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function CreatorAssetsPage({ params }: Props) {
  const client = await getClient();
  const { data } = await client.query({
    query: GET_USER_QUERY,
    variables: {
      username: (await params).username
    }
  });
return <CreatorAssets data={data}/>

}
