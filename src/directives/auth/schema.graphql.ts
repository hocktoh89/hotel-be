import gql from 'graphql-tag';

export const typeDefs = gql`
  directive @auth(roles: [UserRole!]!) on FIELD_DEFINITION
`;
