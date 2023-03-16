import {
  ChannelResolvers,
  MutationSignUpArgs,
  QueryUserArgs,
  Token,
  User,
  UserResolvers,
} from "../../generated/gql-types";
import { v4 as uuidv4 } from "uuid";
import luloDatabase from "../../models";

export const UserType: UserResolvers<any, User> = {
  // current user should access to only some characters
  availableChannelCharacters: async (parent: User, args: {}, options: any) => {
    return (await luloDatabase.models.ChannelCharacter.findAll()).map((ch) => {
      return {
        ...ch,
        createdAt: ch.createdAt.toISOString(),
        updatedAt: ch.updatedAt.toISOString(),
      };
    });
  },
};
