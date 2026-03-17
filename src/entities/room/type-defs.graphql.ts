import gql from 'graphql-tag';

export const typeDefs = gql`
  enum RoomType {
    SINGLE
    DOUBLE
    LUXURY
  }

  input SearchRoomInput {
    query: String!
  }

  type Room {
    id: Int!
    number: String!
    category: RoomType!
    price: Float!
    bookings: [Booking!]!
    logs: [RoomLog!]!
  }

  type Query {
    searchRooms(input: SearchRoomInput!): [Room!]!
    # Staff & Customer: View available rooms
    rooms(category: RoomType): [Room!]!
    room(id: Int!): Room
  }
`;
