import { combineResolvers } from "graphql-resolvers";
import { Resolvers } from "../generated/gql-types";

// auth resolvers
import { UserType, me } from "./auth/user";
import { userChannels, ChannelType, channelUsers } from "./auth/channel";

// lulo resolvers
import { channelCharacters } from "./lulo/channel-character";
import {
  hasChannelPermissions,
  isAuthenticated,
} from "../services/auth-service";
import { channelMessages, sendMessageOnChannel } from "./auth/message";

export const resolvers: Resolvers = {
  Query: {
    // auth queries
    me: combineResolvers(isAuthenticated, me),
    userChannels,
    channelMessages,
    channelUsers,
    // lulo queries
    channelCharacters,
  },
  Mutation: {
    // auth mutations
    sendMessageOnChannel: combineResolvers(
      isAuthenticated,
      sendMessageOnChannel
    ),
    // lulo mutations
  },

  // auth types
  Channel: ChannelType,
  User: UserType,

  // lulo types
};

export default resolvers;
