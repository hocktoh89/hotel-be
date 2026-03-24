import gql from 'graphql-tag';

export const typeDefs = gql`
  directive @auth(role: UserRole!) on FIELD_DEFINITION
`;
