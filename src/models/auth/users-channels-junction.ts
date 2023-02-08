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
} from "sequelize-typescript";
import { Channel } from "./channel";
import { User } from "./user";

interface UsersChannelsJunctionAttributes {
  id: string;
  channelId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UsersChannelsJunctionCreationAttributes
  extends Optional<
    UsersChannelsJunctionAttributes,
    "createdAt" | "updatedAt"
  > {}

@Table({
  modelName: "UsersChannelsJunction",
  tableName: "users_channels_junction",
  //   indexes: [],
})
export class UsersChannelsJunction
  extends Model<
    UsersChannelsJunctionAttributes,
    UsersChannelsJunctionCreationAttributes
  >
  implements UsersChannelsJunctionAttributes
{
  // columns
  @Column({ primaryKey: true, allowNull: false, type: DataType.STRING(128) })
  id: string;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;

  // foreign keys
  @ForeignKey(() => Channel)
  @Column({ type: DataType.STRING(128) })
  channelId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(128) })
  userId: string;

  // relations
}
