import express from "express";
import { ExpressContext } from "apollo-server-express";
import { User } from "../models/auth/user";
import { AuthContext, getMe } from "./auth-service";

export const createContext = async (context: ExpressContext) => {
  
  // the request comes with auth (RequestContext) but express dont recognized it, so we need to force to use it.
  const req: RequestContext = context.req as RequestContext;

  return {
    req,
    me: await getMe(req),
  };
};

// interfaces

export interface RequestContext extends express.Request, AuthContext {}

export interface GraphQLContext {
  me: User;
  req: RequestContext;
}
