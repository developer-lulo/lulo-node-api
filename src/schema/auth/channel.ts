import { gql } from "apollo-server-express";

export default gql`
  type Query {
    userChannels(userId: String!): [Channel]
    channelUsers(channelId: String!): [User]
  }

  #   type Mutation {
  #     # sendMessage(input:SendMessageInput): String
  #   }

  type Channel {
    id: String!
    displayName: String
    imageUrl: String
    updatedAt: String
    createdAt: String
    channelCharacterId: String
    channelCharacter: ChannelCharacter
  }

  #   input SendMessageInput {
  #     text: String!
  #     channelId: String!
  #   }
`;
