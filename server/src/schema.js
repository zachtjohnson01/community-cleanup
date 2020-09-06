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
    createEvent(input: CreateEventInput!): CreateEventResponse!
    addAttendeeToEvent(
      input: AddAttendeeToEventInput!
    ): AddAttendeeToEventResponse!
    createEventAttendeeType(
      input: CreateEventAttendeeTypeInput!
    ): CreateEventAttendeeTypeResponse!
  }

  input CreateUserInput {
    name: String!
    email: String
  }
  type CreateUserResponse {
    success: Boolean!
    message: String
    user: User
  }

  input CreateEventInput {
    name: String!
    location: String
  }
  type CreateEventResponse {
    success: Boolean!
    message: String
    event: Event
  }
  input CreateEventAttendeeTypeInput {
    name: String!
  }
  type CreateEventAttendeeTypeResponse {
    success: Boolean!
    message: String
    eventAttendeeType: EventAttendeeType
  }
  input AddAttendeeToEventInput {
    eventId: ID!
    userId: ID!
    typeId: ID
  }
  type AddAttendeeToEventResponse {
    success: Boolean!
    message: String
    attendee: EventAttendee
  }

  type User {
    id: ID!
    name: String!
    email: String
  }
  type EventAttendee {
    event: Event!
    user: User!
    type: EventAttendeeType
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

  type EventAttendeeType {
    id: ID!
    name: String!
  }
`;

module.exports = typeDefs;
