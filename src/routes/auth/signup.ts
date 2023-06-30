import { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import luloDatabase from "../../models";
import { v4 as uuidv4 } from "uuid";
import { cryptPassword, generateToken } from "../../services/auth-service";
import { Transaction } from "sequelize";
import { DEFAULT_CHANNEL_ON_CREATE_USER } from "../../models/auth/channel";
import { ChannelCharacterKey } from "../../generated/gql-types";

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
  const userExists = await luloDatabase.models.User.findOne({
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

  const { userId } = await luloDatabase.sequelize
    .transaction(async (transaction: Transaction) => {
      try {
        const newUser = await luloDatabase.models.User.create(
          {
            id: uuidv4(),
            email,
            password: await cryptPassword(password),
            displayName: email, // email as default, the user can change it later.
          },
          {
            transaction,
          }
        );

        const pinnapple = await luloDatabase.models.ChannelCharacter.findOne({
          where: {
            key: ChannelCharacterKey.Pinnaple
          }
        })
        await luloDatabase.models.UsersCharactersJunction.create(
          {
            characterId: pinnapple.dataValues.id,
            userId: newUser.dataValues.id,
            id: uuidv4(),
          },
          {
            transaction,
          }
        );

        transaction.commit();

        return {
          userId: newUser.dataValues.id,
        };
      } catch (error) {
        transaction.rollback();
        throw new Error(error.message);
      }
    })
    .catch((error) => {

      throw {
        error,
        message: "Something went wrong creating the new user",
      };
    });

  // generating the token to signin at the same time
  const token = generateToken({
    userId,
  });

  return {
    token,
  };
};
