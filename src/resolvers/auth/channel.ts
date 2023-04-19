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
  MutationCreateChannelArgs,
} from "../../generated/gql-types";
import luloDatabase from "../../models";
import { GraphQLContext } from "../../services/apollo-service";
import { v4 as uuidv4 } from "uuid";
import {
  UsersChannelsJunction,
  UsersChannelsJunctionAttributes,
} from "../../models/auth/users-channels-junction";

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

export const createChannel: Resolver<
  ResolverTypeWrapper<Channel>,
  {},
  any,
  Partial<MutationCreateChannelArgs>
> = async (
  parent: any,
  args: MutationCreateChannelArgs,
  context: GraphQLContext
) => {
  const channelCreated = await luloDatabase.sequelize.transaction(
    async (transaction) => {
      const newChannel = await luloDatabase.models.Channel.create(
        {
          id: uuidv4(),
          channelCharacterId: args.input.channelCharacterId,
          displayName: args.input.displayName,
          imageUrl: args.input.imageUrl,
        },
        { transaction }
      );

      // create juntions

      // TODO: validate if the users in the array exists
      const junctions = args.input.userChannelsIds.map((userId) => {
        return {
          id: uuidv4(),
          channelId: newChannel.id,
          userId: userId,
        } as UsersChannelsJunctionAttributes;
      });

      await luloDatabase.models.UsersChannelsJunction.bulkCreate(junctions, {
        transaction,
      });

      return newChannel;
    }
  );

  return {
    ...channelCreated.dataValues,
    updatedAt: channelCreated.updatedAt.toISOString(),
    createdAt: channelCreated.createdAt.toISOString(),
  };
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
