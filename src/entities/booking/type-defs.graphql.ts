import gql from 'graphql-tag';

export const typeDefs = gql`
  enum BookingStatus {
    BOOKED
    CANCELLED
    CHECKED_OUT
  }

  type Booking {
    id: Int!
    customerId: String!
    customer: User!
    roomId: Int!
    room: Room!
    staffId: String
    staff: User
    checkIn: DateTime!
    checkOut: DateTime!
    status: BookingStatus!
    logs: [RoomLog!]!
  }

  input BookingInput {
    roomId: Int!
    customerId: String!
    checkIn: DateTime!
    checkOut: DateTime!
  }

  type BookingResponsePayload {
    code: Int!
    success: Boolean!
    status: BookingStatus!
  }

  type Query {
    # Customer: View my bookings / Staff: View all bookings
    bookings: [Booking!]!
    booking(id: Int!): Booking
  }

  type Mutation {
    # Customer/Staff: Create a reservation
    createBooking(input: BookingInput!): BookingResponsePayload!

    # Staff/Customer: Cancel a booking
    updateBookingStatus(id: Int!, status: BookingStatus!): Booking!
  }
`;
