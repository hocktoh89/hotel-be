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
      console.log('.  context.auth.user.  ', context.auth.user);
      if (!context.auth.user) {
        return null;
        // throw new GraphQLError('Not authenticated', {
        //   extensions: {
        //     code: 'UNAUTHENTICATED',
        //     http: { status: 401 },
        //   },
        // });
      }

      const user = await context.prisma.user.findUnique({
        where: { id: context.auth.user.userId },
      });

      if (!user) {
        // throw new GraphQLError('User not found', {
        //   extensions: {
        //     code: 'NOT_FOUND',
        //     http: { status: 404 },
        //   },
        // });
        return null;
      }

      return {
        ...user,
        role: user.role as UserRole,
      };
    },
  },
  Mutation: {
    login: async (_parent, { input: { email, password } }, context) => {
      try {
        const user = await context.prisma.user.findUnique({ where: { email } });

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

        // // 1. Trigger the context helper to set the HTTP-only cookie
        // context.auth.login({
        //   id: user.id,
        //   isAdmin: user.role === 'STAFF',
        // });

        const token = jwt.sign(
          {
            userId: user.id,
            email,
            isAdmin: user.role === 'STAFF',
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn: '1h',
          },
        );

        const expires = new Date();

        expires.setDate(expires.getDate() + 1);

        await context.prisma.session.create({
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
