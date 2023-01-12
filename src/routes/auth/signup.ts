import { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../..";
import models from "../../models";
import { v4 as uuidv4 } from "uuid";
import { cryptPassword, generateToken } from "./utils";

export interface SignUpBody {
  email: string;
  password: string;
}

export const handler = async (req: Request, res: Response) => {
  const { email, password } = req.body as SignUpBody;

  // before create validations
  if (!email || !password) {
    throw {
      code: 403,
      message: "You need to provide email and password fields",
    };
  }

  // check if already exists a user with the same email
  const userExists = await models.User.findOne({
    where: {
      email,
    },
  });
  if (userExists) {
    throw {
      code: 403,
      message: "Email already used by another user",
    };
  }

  // creating the new user
  const newUser = await models.User.create({
    id: uuidv4(),
    email,
    password: await cryptPassword(password),
    displayName: email, // email as default, the user can change it later.
  }).catch((error) => {
    throw {
      error,
      message: "Something went wrong creating the new user",
    };
  });

  // generating the token to signin at the same time
  const token = generateToken({
    userId: newUser.dataValues.id,
  });

  return {
    token,
  };
};
