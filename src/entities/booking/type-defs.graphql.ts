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
    checkIn: String!
    checkOut: String!
    status: BookingStatus!
    logs: [RoomLog!]!
  }

  type Query {
    # Customer: View my bookings / Staff: View all bookings
    bookings: [Booking!]!
    booking(id: Int!): Booking
  }

  type Mutation {
    # Customer/Staff: Create a reservation
    createBooking(
      roomId: Int!
      customerId: String!
      checkIn: String!
      checkOut: String!
    ): Booking!

    # Staff/Customer: Cancel a booking
    updateBookingStatus(id: Int!, status: BookingStatus!): Booking!
  }
`;
