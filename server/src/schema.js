const { gql } = require("apollo-server");

const typeDefs = gql`
  # Your schema will go here
  type Query {
    parks: [Park]!
  }
  type Park {
    id: ID!
    name: String
    label: String
    location: String
    zip: Int
  }
`;

module.exports = typeDefs;
