import { QueryInterface, DataTypes, QueryTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable("users", {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(128),
          field: "id",
        },
        displayName: {
          type: Sequelize.STRING(128),
          unique: false,
          field: "display_name",
        },
        email: {
          type: Sequelize.STRING(256),
          unique: true,
          allowNull: false,
        },
        phoneNumber: {
          type: Sequelize.STRING(128),
          allowNull: true,
          field: "phone_number",
        },
        password: {
          type: Sequelize.STRING(256),
          allowNull: false,
          field: "password",
        },
        avatar: {
          type: Sequelize.STRING,
          allowNull: true,
          field: "avatar",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: "created_at",
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: "updated_at",
        },
      });
      await queryInterface.addIndex("users", {
        name: "users_id_email",
        fields: ["id", "email"],
        unique: true,
      });
    }),

  down: (queryInterface: QueryInterface, Sequelize): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("users");
      await queryInterface.removeIndex("users", "users_id_email")
    }),
};
