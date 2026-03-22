import {
  AuthResponsePayload,
  UserRole,
  Resolvers,
} from '@/types/resolvers-types';
import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';

const saltRounds = 10;

const resolvers: Resolvers = {
  Query: {
    me: async (parent, args, context) => {
      try {
        const foundMe = context.auth.me;

        if (!foundMe) {
          throw new GraphQLError('Not authenticated', {
            extensions: {
              code: 'UNAUTHENTICATED',
              http: { status: 401 },
            },
          });
        }

        const user = await context.prisma.user.findUnique({
          where: { id: foundMe.id },
        });

        if (!user) {
          throw new GraphQLError('User not found', {
            extensions: {
              code: 'NOT_FOUND',
              http: { status: 404 },
            },
          });
        }

        return {
          ...foundMe,
          role: user.role as UserRole,
        };
      } catch (err) {
        throw new GraphQLError('Error Accessing Me!', {
          extensions: {
            code: 'BAD_REQUEST',
            http: { status: 400 },
            message: err,
          },
        });
      }
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

        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (!passwordCorrect) {
          return new GraphQLError('Invalid credentials', {
            extensions: {
              code: 'INVALID_INPUT',
              http: { status: 403 },
            },
          }) as unknown as AuthResponsePayload;
        }

        await context.auth.login({
          id: user.id,
          email: user.email,
          isAdmin: user.role === 'STAFF',
        });

        return {
          code: 201,
          success: true,
          message: 'Log in successful',
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
      // try {
      let hashedPwd: string | undefined = await bcrypt.hash(
        password,
        saltRounds,
      );

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPwd,
          username,
        },
      });

      return {
        code: 201,
        success: true,
        message: 'register in successful',
        user,
      };
      // } catch (err) {
      //   return new GraphQLError('Failed to register.', {
      //     extensions: {
      //       code: ['INTERNAL_ERROR'],
      //       http: { status: 500 },
      //     },
      //   }) as unknown as AuthResponsePayload;
      // }
    },
  },
};

export default resolvers;
