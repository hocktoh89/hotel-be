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

import {
  resolvers as roomLogResolvers,
  typeDefs as roomLogTypeDefs,
} from './entities/roomLog/index.js';

import {
  resolvers as bookingResolvers,
  typeDefs as bookingTypeDefs,
} from './entities/booking/index.js';

const schema = makeExecutableSchema({
  typeDefs: [
    scalarTypeDefs,
    jobTypeDefs,
    userTypeDefs,
    roomLogTypeDefs,
    bookingTypeDefs,
  ],
  resolvers: [
    scalarResolvers,
    jobResolvers,
    userResolvers,
    roomLogResolvers,
    bookingResolvers,
  ],
});

export default schema;
