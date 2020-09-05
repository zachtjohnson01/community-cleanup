const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { createStore } = require("./utils");

const ParkAPI = require("./datasources/park");
const SiteAPI = require("./datasources/site");

const store = createStore();

const dataSources = () => ({
  parkAPI: new ParkAPI(),
  siteAPI: new SiteAPI({ store }),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

module.exports = {
  server,
  ParkAPI,
  SiteAPI,
  store,
};
