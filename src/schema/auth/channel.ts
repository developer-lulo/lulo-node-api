import { gql } from "apollo-server-express";

export default gql`
  type Query {
    userChannels(userId: String!): [Channel]
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
  }

  #   input SendMessageInput {
  #     text: String!
  #     channelId: String!
  #   }
`;
