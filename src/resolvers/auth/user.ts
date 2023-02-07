import {
  MutationSignUpArgs,
  QueryUserArgs,
  Token,
  User,
} from "../../generated/gql-types";
import { v4 as uuidv4 } from "uuid";
// import models from "../../models";

export const user = async (
  parent,
  args: Partial<QueryUserArgs>
): Promise<User> => {
  // const user = await models.User.findByPk(args.userId);
  // return user.dataValues as User;
  return {} as User;
};

export const signUp = async (
  parent,
  args: Partial<MutationSignUpArgs>
): Promise<Token> => {
  // const user = await models.User.create({
  //   id: uuidv4(),
  //   email: args.input.email,
  //   password: args.input.password,
  // });

  return {
    token: "token123",
    user: {} as User,
  };
};
