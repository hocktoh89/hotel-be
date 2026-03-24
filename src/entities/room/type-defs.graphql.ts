import gql from 'graphql-tag';

export const typeDefs = gql`
  enum RoomType {
    SINGLE
    DOUBLE
    LUXURY
  }

  input SearchRoomInput {
    category: RoomType
    checkIn: DateTime!
    checkOut: DateTime!
  }

  input createRoomInput {
    number: String!
    category: RoomType!
    price: Float!
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
    searchAvailableRooms(input: SearchRoomInput!): [Room!]!
      @auth(roles: [STAFF, CUSTOMER])
    # Staff & Customer: View available rooms
    rooms(category: RoomType): [Room!]! @auth(roles: [CUSTOMER])
    room(id: Int!): Room @auth(roles: [CUSTOMER])
  }

  type Mutation {
    createRoom(input: createRoomInput!): Room @auth(roles: [STAFF])
  }
`;
