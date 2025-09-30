import { authCookieKey } from '@/lib/constants';
import { configService } from '@/util/config';
import { ApolloLink, HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache, registerApolloClient } from '@apollo/client-integration-nextjs';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export const { getClient } = registerApolloClient(async () => {
  const token = await getCookie(authCookieKey, { cookies });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext((headers = {}) => {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`
        }
      };
    });
    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri: configService.NEXT_PUBLIC_API_GRAPHQL_URL,
    fetchOptions: { cache: 'no-cache', credentials: 'include' }
  });

  return new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache()
  });
});
