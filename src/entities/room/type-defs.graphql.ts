import gql from 'graphql-tag';

export const typeDefs = gql`
  enum RoomType {
    FULL_TIME
    PART_TIME
    INTERNSHIP
  }

  input SearchRoomInput {
    query: String!
  }

  type Room {
    id: ID!
    description: String!
    location: String!
    type: RoomType!
    price: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    isBooked: Boolean!
  }

  type Query {
    searchRooms(input: SearchRoomInput!): [Room!]!
  }
`;
