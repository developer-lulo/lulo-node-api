// To see more: https://www.npmjs.com/package/sequelize-typescript
import { Optional } from "sequelize";
import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

interface BaseAttributes {
  id: string; //create it by default using uuidv4
  // other properties
  createdAt: Date;
  updatedAt: Date;
}

interface BaseCreationAttributes
  extends Optional<BaseAttributes, "createdAt" | "updatedAt"> {}

@Table({
  modelName: "Base",
  tableName: "base",
  indexes: [],
  timestamps: true,
})
export class Base
  extends Model<BaseAttributes, BaseCreationAttributes>
  implements BaseAttributes
{
  // columns
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.STRING(128),
    defaultValue: uuidv4(),
  })
  id: string;

  // other properties definitions

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;

  // foreign keys

  // relations
}
