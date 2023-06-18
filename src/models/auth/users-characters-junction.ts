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
import { v4 as uuidv4 } from "uuid";

export interface UserCharactersJunctionAttributes {
  id: string;
  characterId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UsersCharactersJunctionCreationAttributes
  extends Optional<
    UserCharactersJunctionAttributes,
    "createdAt" | "updatedAt"
  > {}

@Table({
  modelName: "UsersCharactersJunction",
  tableName: "users_characters_junction",
  timestamps: true,
  //   indexes: [],
})
export class UsersCharactersJunction
  extends Model<
    UserCharactersJunctionAttributes,
    UsersCharactersJunctionCreationAttributes
  >
  implements UserCharactersJunctionAttributes
{
  // columns
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.STRING(128),
    defaultValue: uuidv4(),
  })
  id: string;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;

  // foreign keys
  @ForeignKey(() => Channel)
  @Column({ type: DataType.STRING(128), field: "character_id" })
  characterId: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING(128), field: "user_id" })
  userId: string;

  // relations
}
