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
  ChannelStatus,
  MutationChangeChannelStatusArgs,
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
  return userChannelRecords
    .map((chR) => {
      return {
        ...chR.dataValues,
        channelStatus: chR.dataValues.channelStatus as ChannelStatus,
        updatedAt: chR.updatedAt.toISOString(),
        createdAt: chR.updatedAt.toISOString(),
      };
    })
    .filter((c) => c.channelStatus !== ChannelStatus.Stored);
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
          channelStatus: ChannelStatus.Inuse,
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
    channelStatus: channelCreated.dataValues.channelStatus as ChannelStatus,
    updatedAt: channelCreated.updatedAt.toISOString(),
    createdAt: channelCreated.createdAt.toISOString(),
  };
};

export const changeChannelStatus: Resolver<
  ResolverTypeWrapper<Channel>,
  {},
  any,
  Partial<MutationChangeChannelStatusArgs>
> = async (
  parent: any,
  args: Partial<MutationChangeChannelStatusArgs>,
  context: GraphQLContext
) => {
  const channel = await luloDatabase.models.Channel.findByPk(
    args.input.channelId
  );

  await channel.update({
    channelStatus: args.input.channelStatus,
  });

  const updatedChannel = await channel.reload();

  return {
    ...updatedChannel.dataValues,
    channelStatus: updatedChannel.dataValues.channelStatus as ChannelStatus,
    updatedAt: updatedChannel.updatedAt.toISOString(),
    createdAt: updatedChannel.createdAt.toISOString(),
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
