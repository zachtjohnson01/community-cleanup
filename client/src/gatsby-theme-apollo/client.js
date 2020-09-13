import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";
import fetch from "isomorphic-fetch";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  fetch,
  uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("communitycleanup:token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: "http://localhost:4000",
  cache: new InMemoryCache(),
  typeDefs,
  resolvers: {
    Query: {
      isLoggedIn() {
        const token = localStorage.getItem("communitycleanup:token");
        return Boolean(token);
      },
    },
  },
});

export default client;
