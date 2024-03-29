import { combineResolvers } from "graphql-resolvers";
import { Resolvers } from "../generated/gql-types";

// auth resolvers
import { UserType, me } from "./auth/user";
import {
  userChannels,
  ChannelType,
  channelUsers,
  createChannel,
  changeChannelStatus,
  updateChannelImage,
} from "./auth/channel";

// lulo resolvers
import { channelCharacters } from "./lulo/channel-character";
import {
  hasChannelPermissions,
  isAuthenticated,
} from "../services/auth-service";
import {
  channelMessages,
  sendMessageOnChannel,
  messageCreatedOnChannel,
  changeMessageStatus,
  updateMessageBasicInfo,
  moveMessageToChannel,
} from "./auth/message";

export const resolvers: Resolvers = {
  Query: {
    // auth queries
    me: combineResolvers(isAuthenticated, me),
    userChannels: combineResolvers(isAuthenticated, userChannels),
    channelMessages:combineResolvers(isAuthenticated, channelMessages),
    channelUsers: combineResolvers(isAuthenticated, channelUsers),
    // lulo queries
    channelCharacters,
  },
  Mutation: {
    // auth mutations
    sendMessageOnChannel: combineResolvers(
      isAuthenticated,
      sendMessageOnChannel
    ),
    changeMessageStatus: combineResolvers(isAuthenticated, changeMessageStatus),
    updateMessageBasicInfo: combineResolvers(isAuthenticated, updateMessageBasicInfo),
    createChannel: combineResolvers(isAuthenticated, createChannel),
    changeChannelStatus: combineResolvers(isAuthenticated, changeChannelStatus),
    moveMessageToChannel: combineResolvers(isAuthenticated, moveMessageToChannel),
    updateChannelImage: combineResolvers(isAuthenticated, updateChannelImage)
    // lulo mutations
  },
  Subscription: {
    checkSubscriptionService: {
      // Example using an async generator
      subscribe: async function* () {
        for await (const word of ["Hey There!", "It`s working well", "Ciao"]) {
          yield { checkSubscriptionService: word };
        }
      },
    },

    messageCreatedOnChannel,
  },

  // auth types
  Channel: ChannelType,
  User: UserType,

  // lulo types
};

export default resolvers;
