const { gql } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const typeDefs = gql`
  # Your schema will go here
  scalar Date

  type Query {
    parks: [Park]!
    events: [Event]!
    eventAttendees(eventId: ID!): [EventAttendee]!
    event(id: ID!): Event
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserResponse!
    createEvent(input: CreateEventInput!): Event!
  }

  type CreateUserResponse {
    success: Boolean!
    message: String
    user: User
  }
  input CreateUserInput {
    name: String!
    email: String
  }

  input CreateEventInput {
    name: String!
    location: String
  }

  type User {
    id: ID!
    name: String!
    email: String
  }
  type EventAttendee {
    user: User!
    eventId: ID!
    userId: ID!
    type: ID
  }
  type Park {
    id: ID!
    name: String
    label: String
    location: String
    zip: Int
  }

  type Event {
    id: ID!
    name: String!
    location: String
  }

  type EventAttendeeTypes {
    id: ID!
    name: String!
  }
`;

module.exports = typeDefs;
