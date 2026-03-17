import {
  AuthResponsePayload,
  UserRole,
  Resolvers,
} from '@/types/resolvers-types';
import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

const resolvers: Resolvers = {
  Query: {
    me: async (root, args, context) => {
      if (!context.auth.user) {
        return null;
      }

      const user = await context.prisma.user.findUnique({
        where: { id: context.auth.user.id },
      });

      if (!user) {
        return null;
      }

      return {
        ...user,
        role: user.role as UserRole,
      };
    },
  },
  Mutation: {
    login: async (_parent, { input: { email, password } }, { prisma }) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (user === null || user === undefined) {
          return new GraphQLError('Invalid credentials', {
            extensions: {
              code: 'INVALID_INPUT',
              http: { status: 403 },
            },
          }) as unknown as AuthResponsePayload;
        }

        // TO-DO: bypass encryption password check for now
        // const passwordCorrect = await bcrypt.compare(password, user.password);

        const passwordCorrect = password === user.password;

        if (!passwordCorrect) {
          return new GraphQLError('Invalid credentials', {
            extensions: {
              code: 'INVALID_INPUT',
              http: { status: 403 },
            },
          }) as unknown as AuthResponsePayload;
        }

        const token = jwt.sign(
          {
            userId: user.id,
            email,
          },

          process.env.JWT_SECRET as string,
          {
            expiresIn: process.env.JWT_EXPIRES_IN || '1h',
          },
        );

        const expires = new Date();

        expires.setDate(expires.getDate() + 1);

        await prisma.session.create({
          data: {
            userId: user.id,
            token,
            expires,
          },
        });

        return {
          code: 201,
          success: true,
          message: 'Log in successful',
          token,
        };
      } catch (error) {
        return new GraphQLError('Failed to log in.', {
          extensions: {
            code: ['INTERNAL_ERROR'],
            http: { status: 500 },
          },
        }) as unknown as AuthResponsePayload;
      }
    },
    register: async (
      _parent,
      { input: { email, password, username } },
      { prisma },
    ) => {
      const user = await prisma.user.create({
        data: {
          email,
          password,
          username,
        },
      });

      return {
        code: 201,
        success: true,
        message: 'register in successful',
        user,
      };
    },
  },
};

export default resolvers;
