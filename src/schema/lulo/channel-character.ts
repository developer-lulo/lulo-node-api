import { gql } from "apollo-server-express";

export default gql`
  type Query {
    channelCharacters: [ChannelCharacter]
  }

  #   type Mutation {
  #     # sendMessage(input:SendMessageInput): String
  #   }

  type ChannelCharacter {
    id: String!
    displayName: String!
    imageUrl: String!
    description: String!
    updatedAt: String
    createdAt: String
  }

  #   input SendMessageInput {
  #     text: String!
  #     channelId: String!
  #   }
`;
