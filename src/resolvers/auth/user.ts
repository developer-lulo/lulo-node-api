import {
  ChannelResolvers,
  QueryUserArgs,
  Resolver,
  ResolverTypeWrapper,
  Token,
  User,
  UserResolvers,
} from "../../generated/gql-types";
import { v4 as uuidv4 } from "uuid";
import luloDatabase from "../../models";
import { GraphQLContext } from "../../services/apollo-service";

export const UserType: UserResolvers<any, User> = {
  // current user should access to only some characters
  availableChannelCharacters: async (
    parent: User,
    args: {},
    context: GraphQLContext
  ) => {
    
    const charactersUserJunction = await luloDatabase.models.UsersCharactersJunction.findAll({
      where: {
        userId: parent.id
      }
    });

    const charactersIds = charactersUserJunction.map(chJ => chJ.characterId)

    const characters = await luloDatabase.models.ChannelCharacter.findAll({
      where: {
        id: charactersIds
      }
    });

    let mappedCharacters = characters.map((ch) => {
      return {
        ...ch.dataValues,
        createdAt: ch.createdAt.toISOString(),
        updatedAt: ch.updatedAt.toISOString(),
      };
    });

    return mappedCharacters;
  },
};

export const me: Resolver<ResolverTypeWrapper<User>, {}, any, {}> = async (
  parent: any,
  args: {},
  context: GraphQLContext
) => {
  return {
    ...context.me,
    createdAt: context.me.createdAt.toISOString(),
    updatedAt: context.me.updatedAt.toISOString(),
  };
};
