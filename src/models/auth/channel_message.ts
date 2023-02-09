// To see more: https://www.npmjs.com/package/sequelize-typescript
import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Channel } from "./channel";
import { User } from "./user";
import { v4 as uuidv4 } from "uuid";

export type ChannelMessageType = "task";
export type ChannelMessageStatus = "done" | "stored";

interface ChannelMessageAttributes {
  id: string;
  text: string;
  messageType: ChannelMessageType;
  messageStatus: ChannelMessageStatus;
  userId: string;
  channelId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ChannelMessageCreationAttributes
  extends Optional<ChannelMessageAttributes, "createdAt" | "updatedAt"> {}

@Table({
  modelName: "ChannelMessage",
  tableName: "channel_messages",
  timestamps: true,
  indexes: [],
})
export class ChannelMessage
  extends Model<ChannelMessageAttributes, ChannelMessageCreationAttributes>
  implements ChannelMessageAttributes
{
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.STRING(128),
    defaultValue: uuidv4(),
  })
  id: string;

  @Column({ field: "text", type: DataType.TEXT })
  text: string;

  @Column({
    type: DataType.STRING(64),
    field: "message_type",
    allowNull: false,
  })
  messageType: ChannelMessageType;

  @Column({
    type: DataType.STRING(64),
    field: "message_status",
    allowNull: false,
  })
  messageStatus: ChannelMessageStatus;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;

  // foreign keys
  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(128), field: "user_id" })
  userId: string;

  @ForeignKey(() => Channel)
  @Column({ type: DataType.STRING(128), field: "channel_id" })
  channelId: string;

  // relations
  // Check this: https://www.npmjs.com/package/sequelize-typescript#type-inference:~:text=sequelize%2Dtypescript%20cannot%20know%20which%20foreign%20key%20to%20use%20for%20which%20relation.%20So%20you%20have%20to%20add%20the%20foreign%20keys%20explicitly%3A

  @BelongsTo(() => User, "userId")
  user: User;

  @BelongsTo(() => Channel, "channelId")
  channel: Channel;
}
