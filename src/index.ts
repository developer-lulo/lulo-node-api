import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { expressjwt } from "express-jwt";
import { makeExecutableSchema } from "@graphql-tools/schema";

// Constants and env vars
export const APP_PORT = process.env.APP_PORT || 9000;
export const JWT_SECRET = process.env.JWT_SECRET;

import schema from "./schema";
import resolvers from "./resolvers";
import { loadRoutes } from "./routes";

import luloDatabase from "./models";
import { createContext } from "./services/apollo-service";
const app = express();
app.use(
  cors(),
  express.json(),
  expressjwt({
    algorithms: ["HS256"],
    credentialsRequired: false,
    secret: JWT_SECRET,
  })
);

// REST API
loadRoutes(app);

// GraphQL API
const luloSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers,
});

const apolloServer = new ApolloServer({
  schema: luloSchema,
  context: createContext,
});

await apolloServer.start();
apolloServer.applyMiddleware({ app, path: "/graphql" });

// init the database connection
luloDatabase.sequelize.sync().then(() => {
  // start the express and graphql server
  app.listen({ port: APP_PORT }, () => {
    console.log(`Server running on port ${APP_PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${APP_PORT}/graphql`);
  });
});
