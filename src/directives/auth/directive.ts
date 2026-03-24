import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { Context } from '../../context';
import { UserRole } from '../../types/resolvers-types';

const authDirective = (schema: GraphQLSchema) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, 'auth')?.[0];

      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        const requiredRole = authDirective.role as UserRole;
        fieldConfig.resolve = async function (
          source,
          args,
          context: Context,
          info,
        ) {
          const user = context.auth.me;

          if (!user) {
            throw new Error('Not authenticated');
          }

          if (requiredRole === UserRole.STAFF && !user.isAdmin) {
            throw new Error('Not authorized - Admin access required! ');
          }

          return resolve(source, args, context, info);
        };
      }
      return fieldConfig;
    },
  });
};

export default authDirective;
