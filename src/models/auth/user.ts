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
  timestamps: true,
  indexes: [],
})
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  @Column({ primaryKey: true, allowNull: false, type: DataType.TEXT })
  id: string;

  @Column({ allowNull: false, field: "display_name" })
  displayName: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: true, field: "phone_number" })
  phoneNumber: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: true })
  avatar: string;

  @CreatedAt
  @Column({ field: "created_at" })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updatedAt: Date;
}
