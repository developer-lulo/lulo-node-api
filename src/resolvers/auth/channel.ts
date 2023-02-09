import { Transaction } from "sequelize";
import {
  Resolver,
  ResolverTypeWrapper,
  Channel,
  RequireFields,
  QueryUserChannelsArgs,
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
      console.log(channelsJ);

      const channelIds = channelsJ.map((channelJ) => {
        return channelJ.dataValues.channelId;
      });

      console.log(channelIds);

      return await luloDatabase.models.Channel.findAll({
        where: {
          id: channelIds
        },
        transaction,
      });
    }
  );

  console.log(userChannelRecords)
  return userChannelRecords.map((chR) => {
    return {
      ...chR.dataValues,
      updatedAt: chR.updatedAt.toString(),
      createdAt: chR.updatedAt.toString(),
    };
  });
};
