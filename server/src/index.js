const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const ParkAPI = require("./datasources/park");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    parkAPI: new ParkAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
