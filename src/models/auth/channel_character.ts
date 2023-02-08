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
} from "sequelize-typescript";
import { Channel } from "./channel";

interface ChannelCharacterAttributes {
  id: string;
  displayName: string;
  imageUrl: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ChannelCharacterCreationAttributes
  extends Optional<ChannelCharacterAttributes, "createdAt" | "updatedAt"> {}

@Table({
  modelName: "ChannelCharacter",
  tableName: "channel_characters",
  indexes: [],
})
export class ChannelCharacter
  extends Model<ChannelCharacterAttributes, ChannelCharacterCreationAttributes>
  implements ChannelCharacterAttributes
{
  @Column({ primaryKey: true, allowNull: false, type: DataType.STRING(128) })
  id: string;

  @Column({
    field: "display_name",
    type: DataType.STRING(128),
    allowNull: false,
  })
  displayName: string;

  @Column({ field: "image_url", type: DataType.STRING, allowNull: false })
  imageUrl: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;

  // relations
  @HasMany(() => Channel)
  channels: Channel[];
}
