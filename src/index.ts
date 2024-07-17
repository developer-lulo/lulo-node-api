import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import express from "express";
import { expressjwt } from "express-jwt";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import schema from "./schema";
import resolvers from "./resolvers";
import { loadRoutes } from "./routes";
import luloDatabase from "./models";
import { createContext, GraphQLContext } from "./services/apollo-service";
import { APP_PORT, JWT_SECRET, SERVER_PATH } from "./config/constants";

// Initialize Express app
const app = express();

// Middleware setup
app.use(
  cors(),
  express.json(),
  // Debug request headers
  (req, res, next) => {
    // console.log(req.headers);
    next();
  },
  expressjwt({
    algorithms: ["HS256"],
    credentialsRequired: false,
    secret: JWT_SECRET,
  })
);

// Create HTTP server
const httpServer = createServer(app);

// Load REST API routes
loadRoutes(app);

// Create GraphQL schema
const luloSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers,
});

// Setup WebSocket server for subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: SERVER_PATH,
});

const serverCleanup = useServer(
  {
    schema: luloSchema,
  },
  wsServer
);

const serverClosePlugin = {
  async serverWillStart() {
    return {
      async drainServer() {
        await serverCleanup.dispose();
      },
    };
  },
};

// Initialize Apollo Server
const server = new ApolloServer<GraphQLContext>({
  schema: luloSchema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    serverClosePlugin,
  ],
  introspection: true,
});

await server.start();

// Apply Apollo middleware to Express app
app.use(
  SERVER_PATH,
  cors<cors.CorsRequest>({}),
  expressMiddleware(server, {
    context: createContext,
  })
);

// Initialize the database connection and start the server
luloDatabase.sequelize.sync().then(() => {
  httpServer.listen({ port: APP_PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${APP_PORT}${SERVER_PATH}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${APP_PORT}${SERVER_PATH}`
    );
  });
});
