import { QueryUserArgs, User } from "../../generated/gql-types";

export const user = (parent, args: Partial<QueryUserArgs>): User => {
  return {
    avatar: "123",
    email: "asdfsd",
    id: "sdfsdfdfs",
  };
};
