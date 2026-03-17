import { Resolvers } from '../../types/resolvers-types';

const resolvers: Resolvers = {
  Mutation: {
    createBooking: async (root, args, { prisma }) => {
      const { roomId, customerId, checkIn, checkOut } = args.input;

      const booking = await prisma.booking.create({
        data: {
          room: { connect: { id: roomId } },
          customer: { connect: { id: customerId } },
          checkIn,
          checkOut,
        },
      });

      return {
        code: 201,
        success: true,
        status: booking?.status,
      };
    },
  },
};

export default resolvers;
