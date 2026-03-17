import { Resolvers } from '../../types/resolvers-types';

const resolvers: Resolvers = {
  Room: {
    bookings: (parent) => {
      return parent.bookings ?? [];
    },
  },
  Query: {
    searchAvailableRooms: async (root, { input }, { prisma }) => {
      const { category, checkIn, checkOut } = input;

      const whereClause = {
        ...(category && { category: { equals: category } }),

        bookings: {
          none: {
            AND: [{ checkIn: { lt: checkOut } }, { checkOut: { gt: checkIn } }],
          },
        },
      };

      const jobs = await prisma.room.findMany({
        where: whereClause,
        include: {
          bookings: true,
        },
      });
      return jobs;
    },
    rooms: async (root, args, context) => {
      const rooms = await context.prisma.room.findMany({
        include: {
          bookings: true,
        },
      });
      return rooms;
    },
  },
  Mutation: {
    createRoom: async (root, args, { prisma }) => {
      const { number, category, price } = args.input;

      const room = await prisma.room.create({
        data: {
          number,
          category,
          price,
        },
      });
      return room;
    },
  },
};

export default resolvers;
