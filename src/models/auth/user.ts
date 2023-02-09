// To see more: https://www.npmjs.com/package/sequelize-typescript
import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { Channel } from "./channel";
import { ChannelMessage } from "./channel_message";
import { UsersChannelsJunction } from "./users-channels-junction";
import { v4 as uuidv4 } from "uuid";

interface UserAttributes {
  id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "phoneNumber" | "avatar" | "createdAt" | "updatedAt"
  > {}

@Table({
  modelName: "User",
  tableName: "users",
  indexes: [
    {
      name: "users_id_email",
      fields: ["id", "email"],
    },
  ],
})
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.STRING(128),
    defaultValue: uuidv4(),
  })
  id: string;

  @Column({
    allowNull: false,
    field: "display_name",
    type: DataType.STRING(128),
  })
  displayName: string;

  @Column({ allowNull: false, unique: true, type: DataType.STRING(256) })
  email: string;

  @Column({
    allowNull: true,
    field: "phone_number",
    type: DataType.STRING(128),
  })
  phoneNumber: string;

  @Column({ allowNull: false, type: DataType.STRING(256) })
  password: string;

  @Column({ allowNull: true, type: DataType.TEXT })
  avatar: string;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;

  // relations
  @BelongsToMany(() => Channel, () => UsersChannelsJunction)
  channels: Channel[];
}
