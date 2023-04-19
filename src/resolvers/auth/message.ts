import {
  Channel,
  ChannelMessageStatus,
  ChannelMessageType,
  Message,
  MutationChangeMessageStatusArgs,
  MutationSendMessageOnChannelArgs,
  QueryChannelMessagesArgs,
  RequireFields,
  Resolver,
  ResolverTypeWrapper,
  SubscriptionMessageCreatedOnChannelArgs,
  SubscriptionResolver,
} from "../../generated/gql-types";
import { withFilter } from "graphql-subscriptions";
import luloDatabase from "../../models";
import { GraphQLContext } from "../../services/apollo-service";
import { v4 as uuidv4 } from "uuid";
import { hasChannelPermissions } from "../../services/auth-service";
import { ForbiddenError } from "apollo-server-express";
import { pubsub } from "../../services/subscriptions-service";

export const channelMessages: Resolver<
  ResolverTypeWrapper<Message>[],
  {},
  any,
  RequireFields<QueryChannelMessagesArgs, "channelId">
> = async (
  parent: any,
  args: QueryChannelMessagesArgs,
  context: GraphQLContext
) => {
  const messages = await luloDatabase.models.ChannelMessage.findAll({
    where: {
      channelId: args.channelId,
    },
  });

  return messages.map((m) => {
    return {
      ...m.dataValues,
      createdAt: m.dataValues.createdAt.toISOString(),
      updatedAt: m.dataValues.updatedAt.toISOString(),
    };
  });
};

export const sendMessageOnChannel: Resolver<
  ResolverTypeWrapper<Message>,
  {},
  any,
  Partial<MutationSendMessageOnChannelArgs>
> = async (
  parent: any,
  args: MutationSendMessageOnChannelArgs,
  context: GraphQLContext
) => {
  // validate if channel exists
  const channelExists = await luloDatabase.models.Channel.findByPk(
    args.input.channelId
  );
  if (!channelExists) {
    throw new ForbiddenError(
      `Sorry but the channel with channelId:${args.input.channelId} doesnt exist`
    );
  }

  // validate if current user has permissions to channel
  const hasPermissions = await hasChannelPermissions({
    userId: context.me.id,
    channelId: args.input.channelId,
  });

  if (!hasPermissions) {
    throw new ForbiddenError("User cannot sent messages on this channel");
  }

  const message = await luloDatabase.models.ChannelMessage.create({
    id: uuidv4(),
    channelId: args.input.channelId,
    messageStatus: ChannelMessageStatus.Pending,
    messageType: ChannelMessageType.Task,
    text: args.input.text,
    userId: context.me.id,
  });

  const messageCreated = {
    ...message.dataValues,
    createdAt: message.createdAt.toISOString(),
    updatedAt: message.updatedAt.toISOString(),
  };

  const publishPayload: MessageCreatedOnChannelObject = {
    channelId: args.input.channelId,
    messageCreated,
  };
  pubsub.publish("MESSAGE_CREATED_ON_CHANNEL", publishPayload);

  return messageCreated;
};

export const messageCreatedOnChannel: SubscriptionResolver<
  ResolverTypeWrapper<Message>,
  "messageCreatedOnChannel",
  {},
  any,
  RequireFields<SubscriptionMessageCreatedOnChannelArgs, "channelId">
> = {
  subscribe: withFilter(
    () => pubsub.asyncIterator("MESSAGE_CREATED_ON_CHANNEL"),
    async (
      messageObject: MessageCreatedOnChannelObject,
      args: RequireFields<SubscriptionMessageCreatedOnChannelArgs, "channelId">,
      context
    ) => {
      return messageObject.channelId === args.channelId;
    }
  ) as any,
  resolve: (messageObject: MessageCreatedOnChannelObject, args, context) => {
    return messageObject.messageCreated;
  },
};

export interface MessageCreatedOnChannelObject {
  channelId: string;
  messageCreated: Message;
}

export const changeMessageStatus: Resolver<
  ResolverTypeWrapper<Message>,
  {},
  any,
  Partial<MutationChangeMessageStatusArgs>
> = async (
  parent: any,
  args: Partial<MutationChangeMessageStatusArgs>,
  context: GraphQLContext
) => {
  const message = await luloDatabase.models.ChannelMessage.findByPk(
    args.input.messageId
  );

  await message.update({
    messageStatus: args.input.messageStatus,
  });

  const updatedMessage = await message.reload();

  return {
    ...updatedMessage.dataValues,
    updatedAt: updatedMessage.updatedAt.toISOString(),
    createdAt: updatedMessage.createdAt.toISOString(),
  };
};
