// To see more: https://www.npmjs.com/package/sequelize-typescript
import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  HasMany,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { ChannelCharacter } from "../lulo/channel_character";
import { User } from "./user";
import { UsersChannelsJunction } from "./users-channels-junction";
import { v4 as uuidv4 } from "uuid";
import { ChannelMessage } from "./channel_message";
import { ChannelStatus } from "../../generated/gql-types";

export const DEFAULT_CHANNEL_ON_CREATE_USER: ChannelAttributes = {
  id: uuidv4(),
  channelCharacterId: "14d0e85d-4374-4932-80a8-b72b9390fb3d",
  displayName: "Tareitas por hacer",
  channelStatus: ChannelStatus.Inuse,
  imageUrl: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  index: 9999,
};

interface ChannelAttributes {
  id: string;
  channelCharacterId: string;
  displayName: string;
  imageUrl: string;
  channelStatus?: string;
  createdAt: Date;
  updatedAt: Date;
  index: number;
}

interface ChannelCreationAttributes
  extends Optional<ChannelAttributes, "createdAt" | "updatedAt"> {}

@Table({
  modelName: "Channel",
  tableName: "channels",
  timestamps: true,
  //   indexes: [],
})
export class Channel
  extends Model<ChannelAttributes, ChannelCreationAttributes>
  implements ChannelAttributes
{
  // columns

  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.STRING(128),
    defaultValue: uuidv4(),
  })
  id: string;

  @Column({ type: DataType.INTEGER, field: "index" })
  index: number;

  @Column({ type: DataType.STRING(128), field: "display_name" })
  displayName: string;

  @Column({ type: DataType.STRING, field: "image_url" })
  imageUrl: string;

  @Column({
    type: DataType.STRING(64),
    field: "channel_status",
    allowNull: true,
    defaultValue: ChannelStatus.Inuse,
  })
  channelStatus: ChannelStatus;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;

  // foreign keys
  @ForeignKey(() => ChannelCharacter)
  @Column({ type: DataType.STRING(128), field: "channel_character_id" })
  channelCharacterId: string;

  // relations
  @BelongsToMany(() => User, () => UsersChannelsJunction)
  users: User[];

  @BelongsTo(() => ChannelCharacter, "channelCharacterId")
  channelCharacter: ChannelCharacter;

  @HasMany(() => ChannelMessage)
  messages: ChannelMessage;
}
