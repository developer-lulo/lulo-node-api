import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import { makeExecutableSchema } from "@graphql-tools/schema";

// Constants and env vars
export const APP_PORT = process.env.APP_PORT || 9000;
export const JWT_SECRET = process.env.JWT_SECRET;

import schema from "./schema";
import resolvers from "./resolvers";

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

const luloSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers,
});

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne((user) => user.email === email);
//   if (user && user.password === password) {
//     const token = jwt.sign({ sub: user.id }, JWT_SECRET);
//     res.json({ token });
//   } else {
//     res.sendStatus(401);
//   }
// });

// const typeDefs = await readFile("./schema.graphql", "utf-8");
// const context = async ({ req }) => {
//   if (req.auth) {
//     const user = await User.findById(req.auth.sub);
//     return { user };
//   }
//   return {};
// };
const apolloServer = new ApolloServer({
  schema: luloSchema,
});
await apolloServer.start();
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: APP_PORT }, () => {
  console.log(`Server running on port ${APP_PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${APP_PORT}/graphql`);
});
