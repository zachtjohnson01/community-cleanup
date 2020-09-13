const { gql } = require("apollo-server");
// const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const typeDefs = gql`
  # Your schema will go here
  # scalar Date

  type Query {
    parks: [Park!]!
    events: [Event!]!
    eventAttendees(eventId: ID!): [EventAttendee!]!
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
    updateEvent(input: UpdateEventInput!): UpdateEventResponse!
    login(authInput: String!): AuthResponse
  }

  type AuthResponse {
    token: String!
  }

  input CreateUserInput {
    name: String!
    email: String
    password: String
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
    event: Event!
  }
  input UpdateEventInput {
    id: ID!
    name: String!
    location: String
  }
  type UpdateEventResponse {
    success: Boolean!
    message: String
    event: Event!
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
    attendeeTypeId: ID
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
    id: ID!
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
    attendees: [EventAttendee!]
  }

  type EventAttendeeType {
    id: ID!
    name: String!
  }
`;

module.exports = typeDefs;
