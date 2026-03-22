import { rule, shield, deny, allow } from 'graphql-shield';

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  return !!ctx.auth.me;
});

// const isAdmin = rule()(async (parent, args, ctx, info) => {
//   return ctx.auth?.me?.role === 'ADMIN';
// });

export const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
      searchAvailableRooms: isAuthenticated,
    },
    Mutation: {
      login: allow,
      register: allow,
    },
  },
  {
    fallbackRule: allow,
  },
);
