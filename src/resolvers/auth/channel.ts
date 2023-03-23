import { Transaction } from "sequelize";
import {
  Resolver,
  ResolverTypeWrapper,
  Channel,
  RequireFields,
  QueryUserChannelsArgs,
  ChannelResolvers,
  User,
  QueryChannelUsersArgs,
} from "../../generated/gql-types";
import luloDatabase from "../../models";
import { GraphQLContext } from "../../services/apollo-service";

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

export const channelUsers: Resolver<
  ResolverTypeWrapper<User>[],
  {},
  any,
  RequireFields<QueryChannelUsersArgs, "channelId">
> = async (
  parent: any,
  args: QueryChannelUsersArgs,
  context: GraphQLContext
) => {
  return luloDatabase.sequelize.transaction(async (transaction) => {
    const usersJunction =
      await luloDatabase.models.UsersChannelsJunction.findAll({
        where: {
          channelId: args.channelId,
        },
        transaction,
      });

    const userIds = usersJunction.map((user) => {
      return user.dataValues.userId;
    });

    const users = await luloDatabase.models.User.findAll({
      where: {
        id: userIds,
      },
      transaction,
    });

    return users.map((user) => {
      return {
        ...user.dataValues,
        createdAt: user.dataValues.createdAt.toISOString(),
        updatedAt: user.dataValues.updatedAt.toISOString(),
      };
    });
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
