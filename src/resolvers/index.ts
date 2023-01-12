import { Resolvers } from "../generated/gql-types";
import { user, signUp } from "../resolvers/auth/user";

export const resolvers: Resolvers = {
  Query: {
    user,
  },
  Mutation: {
    signUp,
  },
};

export default resolvers;
