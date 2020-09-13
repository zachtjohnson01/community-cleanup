const { ApolloServer, AuthenticationError } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { createStore } = require("./utils");

const bcrypt = require("bcryptjs");
const basicAuth = require("basic-auth");
const jwt = require("jsonwebtoken");

const ParkAPI = require("./datasources/park");
const SiteAPI = require("./datasources/site");
const AuthAPI = require("./datasources/auth");

const store = createStore();

const dataSources = () => ({
  parkAPI: new ParkAPI(),
  siteAPI: new SiteAPI({ store }),
  authAPI: new AuthAPI({ store }),
});

// the function that sets up the global context for each resolver, using the req
// TODO: store secret more securely
const secret = "#rS8C$Vh+{[K,-+";
const context = async ({ req }) => {
  try {
    const auth = (await (req.headers && req.headers.authorization)) || "";
    const token = auth.replace(/bearer\s+/i, "");
    const decoded = jwt.verify(token, secret);
    const user = await store.User.findByPk(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }
    return { user };
  } catch (error) {
    console.log(error);
    // throw new AuthenticationError(`Unauthorized: ${error}`);
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  ParkAPI,
  SiteAPI,
  AuthAPI,
  store,
  server,
};
