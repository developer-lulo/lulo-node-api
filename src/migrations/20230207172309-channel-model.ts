import { QueryInterface, DataTypes, QueryTypes } from "sequelize";
import { ChannelCharacterAttributes } from "../models/lulo/channel_character";

const CHARACTERS = [
  {
    id: "14d0e85d-4374-4932-80a8-b72b9390fb3d",
    description:
      "¡Hola! ¡Soy Piñita! Estoy aquí para ayudarte con la creación y gestión de tus tareas y proyectos personales. Juntos, podemos organizar listas de tareas  ¡Juntos, podemos hacer grandes cosas! ¡Cuenta conmigo!",
    display_name: "Piñita",
    image_url:
      "https://storage.googleapis.com/lulo-380819.appspot.com/public/25333842-e447-452d-9627-20d915ccb4c5-pina.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable("channel_characters", {
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
        imageUrl: {
          type: Sequelize.STRING,
          defaultValue: "",
          field: "image_url",
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
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

      await queryInterface.createTable("channels", {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(128),
          field: "id",
        },
        channelCharacterId: {
          type: Sequelize.STRING(128),
          field: "channel_character_id",
          allowNull: false,
          references: {
            model: "channel_characters",
            key: "id",
          },
        },
        displayName: {
          type: Sequelize.STRING(128),
          unique: false,
          field: "display_name",
        },
        imageUrl: {
          type: Sequelize.STRING,
          defaultValue: "",
          field: "image_url",
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

      await queryInterface.createTable("users_channels_junction", {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(128),
          field: "id",
        },
        userId: {
          type: Sequelize.STRING(128),
          field: "user_id",
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        channelId: {
          type: Sequelize.STRING(128),
          field: "channel_id",
          allowNull: false,
          references: {
            model: "channels",
            key: "id",
          },
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

      await queryInterface.createTable("channel_messages", {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING(128),
          field: "id",
        },
        userId: {
          type: Sequelize.STRING(128),
          field: "user_id",
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        channelId: {
          type: Sequelize.STRING(128),
          field: "channel_id",
          allowNull: false,
          references: {
            model: "channels",
            key: "id",
          },
        },
        text: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        messageType: {
          type: Sequelize.STRING(64),
          field: "message_type",
          allowNull: false,
        },
        messageStatus: {
          type: Sequelize.STRING(64),
          field: "message_status",
          allowNull: false,
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

      await queryInterface.bulkInsert("channel_characters", CHARACTERS);
    }),

  down: (queryInterface: QueryInterface, Sequelize): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("users_channels_junction");
      await queryInterface.dropTable("channel_messages");
      await queryInterface.dropTable("channels");
      await queryInterface.dropTable("channel_characters");
    }),
};
