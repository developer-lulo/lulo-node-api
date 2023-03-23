import { gql } from "apollo-server-express";

export default gql`
  type Query {
    channelMessages(channelId: String!): [Message]
  }

  type Mutation {
    sendMessageOnChannel(input: SendMessageInput): String
  }

  enum ChannelMessageType {
    TASK
  }

  enum ChannelMessageStatus {
    PENDING
    DONE
    STORED
  }

  type Message {
    id: String
    text: String
    messageType: ChannelMessageType
    messageStatus: ChannelMessageStatus
    # userId: String
    # user: User
    # channel: Channel
    # channelId: String
    createdAt: String
    updatedAt: String
  }

  input SendMessageInput {
    text: String!
    channelId: String!
  }
`;
