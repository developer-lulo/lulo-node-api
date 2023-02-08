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
import { ChannelCharacter } from "./channel_character";
import { User } from "./user";
import { UsersChannelsJunction } from "./users-channels-junction";

interface ChannelAttributes {
  id: string;
  channelCharacterId: string;
  displayName: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ChannelCreationAttributes
  extends Optional<ChannelAttributes, "createdAt" | "updatedAt"> {}

@Table({
  modelName: "Channel",
  tableName: "channels",
  //   indexes: [],
})
export class Channel
  extends Model<ChannelAttributes, ChannelCreationAttributes>
  implements ChannelAttributes
{
  // columns
  @Column({ primaryKey: true, allowNull: false, type: DataType.STRING(128) })
  id: string;

  @Column({ type: DataType.STRING(128) })
  displayName: string;

  @Column({ type: DataType.STRING })
  imageUrl: string;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;

  // foreign keys
  @ForeignKey(() => ChannelCharacter)
  @Column({ type: DataType.STRING(128) })
  channelCharacterId: string;

  // relations
  @BelongsToMany(() => User, () => UsersChannelsJunction)
  users: User[];

  @BelongsTo(() => ChannelCharacter, "channelCharacterId")
  channelCharacter: ChannelCharacter;
}
