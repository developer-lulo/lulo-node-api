"use strict";
import { Model } from "sequelize";

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

export default (sequelize, DataTypes) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    password: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(128),
        field: "id",
      },
      displayName: {
        type: DataTypes.STRING(128),
        unique: false,
        field: "display_name",
      },
      email: {
        type: DataTypes.STRING(256),
        unique: true,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING(128),
        allowNull: true,
        field: "phone_number",
      },
      password: {
        type: DataTypes.STRING(256),
        allowNull: false,
        field: "password",
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "avatar",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      indexes: [
        {
          name: "users_id_email",
          fields: ["id", "email"],
        },
      ],
      timestamps: true,
    }
  );
  return User;
};
