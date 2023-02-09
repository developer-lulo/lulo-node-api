import {
  ChannelCharacter,
  Resolver,
  ResolverTypeWrapper,
} from "../../generated/gql-types";
import luloDatabase from "../../models";

export const channelCharacters: Resolver<
  ResolverTypeWrapper<ChannelCharacter>[],
  {},
  any,
  {}
> = async (parent, args: {}) => {
  const characterRecords = await luloDatabase.models.ChannelCharacter.findAll();

  return characterRecords.map((chR) => {
    return {
      ...chR.dataValues,
      updatedAt: chR.updatedAt.toISOString(),
      createdAt: chR.createdAt.toISOString(),
    };
  });
};
