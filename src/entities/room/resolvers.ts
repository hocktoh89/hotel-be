import { Resolvers } from '../../types/resolvers-types';

const resolvers: Resolvers = {
  Query: {
    searchRooms: async (root, args, context) => {
      const { query } = args.input;

      const jobs = await context.prisma.job.findMany({
        where: {
          OR: [
            { location: { contains: query } },
            { title: { contains: query } },
          ],
        },
      });
      return jobs;
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
