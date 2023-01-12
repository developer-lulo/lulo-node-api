import { Model, ModelDefined } from "sequelize";
import { User } from "../../generated/gql-types";

const userModel = (sequelize, DataTypes): ModelDefined<any, any> => {
  const User = sequelize.define(
    "user",
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
      freezeTableName: true,
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

  User.associate = (models) => {
    // User.hasMany(models.UserDevice, { as: "devices" });
  };

  return User;
};

export default userModel;
