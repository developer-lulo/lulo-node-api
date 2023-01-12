import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../..";
import bcrypt from "bcrypt";

export interface GenerateTokenProps {
  userId: string;
}
const SALT_ROUNDS = 10;

export const generateToken = (props: GenerateTokenProps) => {
  return jwt.sign(
    {
      user: {
        id: props.userId,
      },
    },
    JWT_SECRET,
    {
      // expiresIn: "10 days",
    }
  );
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
