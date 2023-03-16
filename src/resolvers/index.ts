import { Resolvers } from "../generated/gql-types";

// auth resolvers
import { UserType, me } from "./auth/user";
import { userChannels, ChannelType } from "./auth/channel";

// lulo resolvers
import { channelCharacters } from "./lulo/channel-character";

export const resolvers: Resolvers = {
  Query: {
    // auth queries
    me,
    userChannels,
    // lulo queries
    channelCharacters,
  },
  // Mutation: {
  //   // auth mutations
  //   // lulo mutations
  // },

  // auth types
  Channel: ChannelType,
  User: UserType,

  // lulo types
};

export default resolvers;
