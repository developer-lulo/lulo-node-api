import { Request, Response } from "express";
import luloDatabase from "../../models";
import { generateToken, validatePassword } from "../../services/auth-service";

interface SignInBody {
  email: string;
  password: string;
}

export const handler = async (req: Request, res: Response) => {
  const { email, password } = req.body as SignInBody;

  // before validations
  if (!email || !password) {
    throw {
      code: 403,
      message: "You need to provide email and password fields",
    };
  }

  const userExists = await luloDatabase.models.User.findOne({
    where: {
      email,
    },
  });

  if (!userExists) {
    throw {
      message: "Email and Password combination incorrect",
      code: 401,
    };
  }

  const passMatched = await validatePassword({
    dbPass: userExists.dataValues.password,
    reqPass: password,
  });

  if (!passMatched) {
    throw {
      message: "Email and Password combination incorrect",
      code: 401,
    };
  }
  const token = generateToken({
    userId: userExists.dataValues.id,
  });
  return {
    token,
  };
};
