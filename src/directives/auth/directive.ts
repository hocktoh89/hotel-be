import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { Context } from '../../context';
import { UserRole } from '../../types/resolvers-types';
import { GraphQLError } from 'graphql';

const authDirective = (schema: GraphQLSchema) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, 'auth')?.[0];

      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        const requiredRoles = authDirective.roles as [UserRole];
        fieldConfig.resolve = async function (
          source,
          args,
          context: Context,
          info,
        ) {
          const me = context.auth.me;

          if (!me) {
            throw new GraphQLError('Not authenticated', {
              extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
              },
            });
          }

          if (!requiredRoles.includes(UserRole.STAFF) && !me.isAdmin) {
            throw new Error('Not authorized - Admin access required! ');
          }

          if (!requiredRoles.includes(UserRole.CUSTOMER)) {
            throw new Error('Not authorized - customer access required! ');
          }

          return resolve(source, args, context, info);
        };
      }
      return fieldConfig;
    },
  });
};

export default authDirective;
