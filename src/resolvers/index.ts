import { Resolvers } from "../generated/gql-types";
import { user, signUp } from "../resolvers/auth/user";
import { userChannels } from "./auth/channel";



export const resolvers: Resolvers = {
  Query: {
    user,
    userChannels
  },
  Mutation: {
    signUp,
  },
};

export default resolvers;
