import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_GRAPHQL_URL,
});

export function useApolloClientWithAuth() {
  const auth0 = useAuth0();

  const authLink = React.useMemo(
    () =>
      setContext(async (_, { headers }) => {
        let token;
        try {
          token = await auth0.getAccessTokenSilently();
        } catch {
          token = undefined;
        }

        return {
          headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      }),
    [auth0]
  );

  return React.useMemo(
    () =>
      new ApolloClient({
        link: ApolloLink.from([authLink, httpLink]),
        cache: new InMemoryCache(),
      }),
    [authLink]
  );
}
