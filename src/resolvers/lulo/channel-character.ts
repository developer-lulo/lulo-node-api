import {
  ChannelCharacter,
  Resolver,
  ResolverTypeWrapper,
} from "../../generated/gql-types";
import luloDatabase from "../../models";
import { GraphQLContext } from "../../services/apollo-service";

export const channelCharacters: Resolver<
  ResolverTypeWrapper<ChannelCharacter>[],
  {},
  any,
  {}
> = async (_parent, _args: {}, context: GraphQLContext) => {
  const characterRecords = await luloDatabase.models.ChannelCharacter.findAll();

  return characterRecords.map((chR) => {
    return {
      ...chR.dataValues,
      updatedAt: chR.updatedAt.toISOString(),
      createdAt: chR.createdAt.toISOString(),
    };
  });
};
