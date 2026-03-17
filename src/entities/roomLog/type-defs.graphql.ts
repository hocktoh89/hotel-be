import gql from 'graphql-tag';

export const typeDefs = gql`
  type RoomLog {
    id: Int!
    roomId: Int!
    room: Room!
    bookingId: Int
    booking: Booking
    note: String!
    createdAt: String!
  }

  type Query {
    # Staff: View history for a specific room
    roomHistory(roomId: Int!): [RoomLog!]!
  }

  type Mutation {
    # Staff: Update room status or report damage
    createRoomLog(roomId: Int!, bookingId: Int, note: String!): RoomLog!
  }
`;
