import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import schema from './schema';
import createContext from './context';

interface MyContext {
  token?: String;
}

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer<MyContext>({
  schema: schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection: true,
});
// Ensure we wait for our server to start
await server.start();

// according to RFC8259, only UTF-8 is allowed in JSON text
// (see https://datatracker.ietf.org/doc/html/rfc8259#section-8.1)
// RFC 7159 also specifies that JSON could be UTF-16 or UTF-32,
// so we allow for that, too
const validCharset = /^utf-(8|((16|32)(le|be)?))$/i;

const corsOptions = {
  // Must match your frontend exactly
  // origin: 'http://localhost:5173',
  origin: [
    'http://localhost:5173',
    'http://localhost:4000',
    'https://studio.apollographql.com',
    'https://sandbox.embed.apollographql.com',
  ],
  // Required for cookies or Authorization headers to work
  credentials: true,
  // The headers you want to allow
  allowedHeaders: ['Authorization', 'Content-Type'],
};

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  // cors<cors.CorsRequest>(),
  cors(corsOptions),
  express.json({
    // 50mb is the limit that `startStandaloneServer` uses to cover all possible bases, but you may configure this to suit your needs.
    // Generally we recommend keeping this as small as possible to still suit your use case.
    // The `body-parser` default is '100kb'.
    limit: '50mb',
  }),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: ({ req, res }) => createContext({ req, res }),
  }),
);

// Modified server startup
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve),
);
console.log(`🚀 Server ready at http://localhost:4000/`);
