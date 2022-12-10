import { gql } from "apollo-server-express";

export default gql`
  type Query {
    user(userId: String!): User
    # me: User
  }

  #   extend type Mutation {
  #     login(email: String, password: String): String!
  #   }

  type User {
    id: String!
    email: String!
    phoneNumber: String
    displayName: String
    avatar: String
    role: String
  }
`;
