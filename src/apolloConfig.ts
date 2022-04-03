import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { LOCALSTORAGE_TOKEN } from "constants/constants";

const lsToken = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(lsToken));
export const jwtToken = makeVar<null | string>(lsToken);

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = jwtToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "x-jwt": token || "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return jwtToken();
            },
          },
        },
      },
    },
  }),
});
