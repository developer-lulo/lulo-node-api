import { gql } from "apollo-server-express";

export default gql`
  type Query {
    user(userId: String!): User
    me: User
  }

  #type Mutation {
  #}


  type User {
    id: String!
    email: String!
    phoneNumber: String
    displayName: String
    avatar: String
    updatedAt: String
    createdAt: String
    availableChannelCharacters: [ChannelCharacter]
  }

  type Token {
    token: String!
    user: User
  }

  input SignInput {
    email: String!
    password: String!
  }
`;
