import { gql } from "apollo-server-express";

export default gql`
  type Query {
    userChannels(userId: String!): [Channel]
    channelUsers(channelId: String!): [User]
  }

  type Mutation {
    createChannel(input: CreateChannelInput): Channel
  }

  type Channel {
    id: String!
    displayName: String
    imageUrl: String
    updatedAt: String
    createdAt: String
    channelCharacterId: String
    channelCharacter: ChannelCharacter
  }

  input CreateChannelInput {
    channelCharacterId: String!
    displayName: String!
    imageUrl: String!
    userChannelsIds: [String]!
  }
`;
