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
import { Channel } from "../auth/channel";
import { v4 as uuidv4 } from "uuid";
import { ChannelCharacterAction, ChannelCharacterKey } from "../../generated/gql-types";
export interface ChannelCharacterAttributes {
  id: string;
  displayName: string;
  imageUrl: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  action: ChannelCharacterAction;
  isActive: boolean;
  key: ChannelCharacterKey
}

interface ChannelCharacterCreationAttributes
  extends Optional<ChannelCharacterAttributes, "createdAt" | "updatedAt"> {}

@Table({
  modelName: "ChannelCharacter",
  tableName: "channel_characters",
  timestamps: true,
  indexes: [],
})
export class ChannelCharacter
  extends Model<ChannelCharacterAttributes, ChannelCharacterCreationAttributes>
  implements ChannelCharacterAttributes
{
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.STRING(128),
    defaultValue: uuidv4(),
  })
  id: string;

  @Column({
    field: "display_name",
    type: DataType.STRING(128),
    allowNull: false,
  })
  displayName: string;

  @Column({
    field: "action",
    type: DataType.STRING(128),
    allowNull: false,
  })
  action: ChannelCharacterAction;

  @Column({
    field: "key",
    type: DataType.STRING(128),
    allowNull: false,
  })
  key: ChannelCharacterKey;
  
  @Column({
    field: "is_active",
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  isActive: boolean;

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
