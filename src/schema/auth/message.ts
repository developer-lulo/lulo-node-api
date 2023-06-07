import { gql } from "apollo-server-express";

export default gql`
  type Query {
    channelMessages(channelId: String!): [Message]
  }

  type Mutation {
    sendMessageOnChannel(input: SendMessageInput): Message
    changeMessageStatus(input: ChangeMessageStatusInput): Message
    updateMessageBasicInfo(input: UpdateMessageBasicInfo): Message
    moveMessageToChannel(input: MoveMessageToChannelInput): Message
  }

  type Subscription {
    messageCreatedOnChannel(channelId: String!): Message
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
    description: String
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

  input ChangeMessageStatusInput {
    messageId: String!
    messageStatus: ChannelMessageStatus
  }

  input UpdateMessageBasicInfo {
    messageId: String!
    text: String
    description: String
  }

  input MoveMessageToChannelInput {
    messageId: String!
    newChannelId: String!
  }
`;
