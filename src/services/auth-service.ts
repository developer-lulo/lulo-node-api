import express, { Response, Request, NextFunction } from "express";
import { AuthenticationError } from "apollo-server-express";
import luloDatabase from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "..";
import { RequestContext } from "./apollo-service";
import { ExpirationHandler, UnauthorizedError } from "express-jwt";
import { User } from "../generated/gql-types";

export interface GenerateTokenProps {
  userId: string;
}

export interface TokenSign {
  user: {
    id: string;
  };
}

export interface AuthContext {
  auth: TokenSign;
}

const SALT_ROUNDS = 10;

export interface AfterGetMeMidRequest extends RequestContext {
  me: User;
}

export const getMeMiddleWare = async (
  req: AfterGetMeMidRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getMe(req);
    req.me = {
      ...user.dataValues,
      createdAt: user.dataValues.createdAt.toISOString(),
      updatedAt: user.dataValues.updatedAt.toISOString(),
    };
    next();
  } catch (error) {
    throw {
      message: error.message,
      where: "GET_ME_MIDDLEWARE",
    };
  }
};

export const getMe = async (req: RequestContext) => {
  if (req.auth) {
    const { user } = req.auth;
    return await luloDatabase.models.User.findByPk(user.id);
  } else {
    throw new AuthenticationError("Your session expired. Sign in again.");
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
