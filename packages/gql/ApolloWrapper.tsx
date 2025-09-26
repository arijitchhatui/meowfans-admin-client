'use client';

import { configService } from '@/util/config';
import { BearerAccessToken } from '@/util/helpers';
import { ApolloLink, HttpLink } from '@apollo/client';
import { ApolloClient, ApolloNextAppProvider, InMemoryCache } from '@apollo/client-integration-nextjs';

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${configService.NEXT_PUBLIC_API_GRAPHQL_URL}`,
    fetchOptions: { cache: 'no-store' }
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext((headers = {}) => ({
      headers: {
        ...headers,
        Authorization: BearerAccessToken()
      }
    }));
    return forward(operation);
  });

  return new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache()
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
