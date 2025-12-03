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
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

  const authLink = React.useMemo(
    () =>
      setContext(async (_, { headers }) => {
        let token;

        try {
          token = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.REACT_APP_AUTH0_AUDIENCE,
              scope: "openid profile email",
            },
          });
        } catch (e) {
          console.log("getAccessTokenSilently error", e);

          const err = e?.error || e?.message || "";

          if (
            err === "login_required" ||
            err === "consent_required" ||
            err === "invalid_grant"
          ) {
            setTimeout(() => {
              loginWithRedirect({
                appState: { returnTo: window.location.pathname },
                authorizationParams: {
                  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                  scope: "openid profile email",
                },
              });
            }, 0);
          }

          token = undefined;
        }

        return {
          headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
          },
        };
      }),
    [getAccessTokenSilently, loginWithRedirect]
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
