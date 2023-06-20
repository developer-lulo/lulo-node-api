import { gql } from "apollo-server-express";

export default gql`
  type Query {
    channelCharacters: [ChannelCharacter]
  }

  #   type Mutation {
  #     # sendMessage(input:SendMessageInput): String
  #   }

  type Subscription {
    checkSubscriptionService: String
  }

  type ChannelCharacter {
    id: String!
    displayName: String!
    imageUrl: String!
    description: String!
    updatedAt: String
    createdAt: String
    action: ChannelCharacterAction
  }

  enum ChannelCharacterAction {
    CREATE_NEW
    ACTIVE_N_INACTIVE
  }
`;
