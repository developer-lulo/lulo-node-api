import { Resolvers } from "../generated/gql-types";

// auth resolvers
import { user, signUp } from "../resolvers/auth/user";
import { userChannels, ChannelType } from "./auth/channel";

// lulo resolvers
import { channelCharacters } from "./lulo/channel-character";

export const resolvers: Resolvers = {
  Query: {
    // auth queries
    user,
    userChannels,
    // lulo queries
    channelCharacters,
  },
  Mutation: {
    // auth mutations
    signUp,

    // lulo mutations
  },

  // auth types
  Channel: ChannelType,

  // lulo types
};

export default resolvers;
