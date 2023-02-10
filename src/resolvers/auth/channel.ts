import { Transaction } from "sequelize";
import {
  Resolver,
  ResolverTypeWrapper,
  Channel,
  RequireFields,
  QueryUserChannelsArgs,
  ChannelResolvers,
} from "../../generated/gql-types";
import luloDatabase from "../../models";

export const userChannels: Resolver<
  ResolverTypeWrapper<Channel>[],
  {},
  any,
  RequireFields<QueryUserChannelsArgs, "userId">
> = async (parent, args: QueryUserChannelsArgs) => {
  const userChannelRecords = await luloDatabase.sequelize.transaction(
    async (transaction: Transaction) => {
      const channelsJ = await luloDatabase.models.UsersChannelsJunction.findAll(
        {
          where: { userId: args.userId },
          transaction,
        }
      );

      const channelIds = channelsJ.map((channelJ) => {
        return channelJ.dataValues.channelId;
      });

      return await luloDatabase.models.Channel.findAll({
        where: {
          id: channelIds,
        },
        transaction,
      });
    }
  );
  return userChannelRecords.map((chR) => {
    return {
      ...chR.dataValues,
      updatedAt: chR.updatedAt.toISOString(),
      createdAt: chR.updatedAt.toISOString(),
    };
  });
};

// type
export const ChannelType: ChannelResolvers<any, Channel> = {
  channelCharacter: async (parent: Channel, args: {}, options: any) => {
    const characterRecord = await luloDatabase.models.ChannelCharacter.findByPk(
      parent.channelCharacterId
    );
    return {
      ...characterRecord.dataValues,
      updatedAt: characterRecord.updatedAt.toISOString(),
      createdAt: characterRecord.createdAt.toISOString(),
    };
  },
};
