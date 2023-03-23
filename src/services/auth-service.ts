import express, { Response, Request, NextFunction } from "express";
import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import luloDatabase from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "..";
import { GraphQLContext, RequestContext } from "./apollo-service";
import { ExpirationHandler, UnauthorizedError } from "express-jwt";
import { User, UserAttributes } from "../models/auth/user";
import { skip } from "graphql-resolvers";
export interface GenerateTokenProps {
  userId: string;
}

export interface TokenSign {
  user: {
    id: string;
  };
}

export interface AuthContext {
  auth?: TokenSign;
}

const SALT_ROUNDS = 10;

export interface AfterGetMeMidRequest extends RequestContext {
  me: UserAttributes;
}

export const getMeMiddleWare = async (
  req: AfterGetMeMidRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getMe(req);

    if (!user) {
      throw Error(`User is not authenticated, please sign in`);
    }

    if (user.avatar)
      req.me = {
        ...user,
      };
    next();
  } catch (error) {
    throw {
      message: error.message,
      where: "GET_ME_MIDDLEWARE",
    };
  }
};

export const getMe = async (
  req: RequestContext
): Promise<UserAttributes | undefined> => {
  if (req.auth) {
    const { user } = req.auth;
    return (await luloDatabase.models.User.findByPk(user.id)).dataValues;
  } else {
    return undefined;
  }
};

export const generateToken = (props: GenerateTokenProps) => {
  const tokenSign: TokenSign = {
    user: {
      id: props.userId,
    },
  };

  return jwt.sign(tokenSign, JWT_SECRET, {
    // expiresIn: "10 days",
  });
};

// TODO: update validate method using crypt
export const validatePassword = async (pass: {
  dbPass: string;
  reqPass: string;
}) => {
  return await bcrypt.compare(pass.reqPass, pass.dbPass);
};

export const cryptPassword = async (pass: string) => {
  return await bcrypt.hash(pass, SALT_ROUNDS);
};

// Resolvers to be used with CombineResolvers
export const isAuthenticated = (_: any, __: any, { me }: GraphQLContext) =>
  me ? skip : new ForbiddenError("Not authenticated as user.");
