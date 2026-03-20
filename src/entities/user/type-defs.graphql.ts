import gql from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    me: User
    users: [User!]!
  }

  type Mutation {
    login(input: LoginInput!): AuthResponsePayload!
    register(input: RegisterInput!): RegisterResponsePayload!
  }

  type Session {
    id: ID!
    token: String!
    expires: String!
    createdAt: DateTime!
    updatedAt: DateTime!

    user: User!
  }

  type PasswordResetToken {
    id: String!
    token: String!
    expires: String!
    createdAt: DateTime!

    user: User!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    role: UserRole!
    createdAt: DateTime!
    updatedAt: DateTime!
    bookings: [Booking!]!
    staffBookings: [Booking!]!
  }

  enum UserRole {
    STAFF
    CUSTOMER
  }

  interface ResponsePayload {
    code: Int!
    success: Boolean!
    message: String!
  }

  type AuthResponsePayload implements ResponsePayload {
    code: Int!
    success: Boolean!
    message: String!
  }

  type RegisterResponsePayload implements ResponsePayload {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
    # role: UserRole = CUSTOMER
  }
`;
