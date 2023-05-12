import { gql } from "apollo-server-express";

export default gql`
  type Query {
    userChannels(userId: String!): [Channel]
    channelUsers(channelId: String!): [User]
  }

  type Mutation {
    createChannel(input: CreateChannelInput): Channel
    changeChannelStatus(input: ChangeChannelStatusInput): Channel
  }

  enum ChannelStatus {
    INUSE
    STORED
  }

  type Channel {
    id: String!
    displayName: String
    imageUrl: String
    updatedAt: String
    createdAt: String
    channelCharacterId: String
    channelCharacter: ChannelCharacter
    channelStatus: ChannelStatus
  }

  input CreateChannelInput {
    channelCharacterId: String!
    displayName: String!
    imageUrl: String!
    userChannelsIds: [String]!
  }

  input ChangeChannelStatusInput {
    channelId: String!
    channelStatus: ChannelStatus
  }
`;
