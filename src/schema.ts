import 'graphql-import-node';
import { makeExecutableSchema } from '@graphql-tools/schema';

import {
  resolvers as scalarResolvers,
  typeDefs as scalarTypeDefs,
} from './scalar/index.js';

import {
  resolvers as userResolvers,
  typeDefs as userTypeDefs,
} from './entities/user/index.js';

import {
  resolvers as jobResolvers,
  typeDefs as jobTypeDefs,
} from './entities/room/index.js';

const schema = makeExecutableSchema({
  typeDefs: [scalarTypeDefs, jobTypeDefs, userTypeDefs],
  resolvers: [scalarResolvers, jobResolvers, userResolvers],
});

export default schema;
