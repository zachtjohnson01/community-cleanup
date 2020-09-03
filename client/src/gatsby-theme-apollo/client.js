import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  gql,
} from "@apollo/client";
import fetch from "isomorphic-fetch";

const httpLink = new HttpLink({
  fetch,
  uri: "http://localhost:4000/",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

export default client;
