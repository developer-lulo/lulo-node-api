import { Resolvers } from "../generated/gql-types";
import { user } from "../resolvers/auth/user";

export const resolvers: Resolvers = {
  Query: {
    user,
  },
};

export default resolvers;
