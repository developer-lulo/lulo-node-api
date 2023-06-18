'use strict';

import { v4 as uuidv4 } from "uuid";

const CHARACTERS = [
  {
    id: "2e141826-04e7-46e6-a078-1ef33512f842",
    description:
      "¡Hola! ¡Soy Naranja! yo te ayudaré a gestionar tus tareas diarias. Cada recordatorio es un pequeño gesto de cariño, cada tarea, una oportunidad de crecimiento!",
    display_name: "Naranja",
    image_url:
      "https://storage.googleapis.com/lulo-380819.appspot.com/public/aa82df60-1e23-442a-8f19-7fa4c900eb54-naranja.png",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable("users_characters_junction", {
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
      characterId: {
        type: Sequelize.STRING(128),
        field: "character_id",
        allowNull: false,
        references: {
          model: "channel_characters",
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

    const users = await queryInterface.sequelize.query("select * from users")
    const characters = await queryInterface.sequelize.query("select * from channel_characters")

    const characterId = characters[0][0].id

    const recordsToInsert = users[0].map(user => {
      return {
        created_at: new Date(),
        updated_at: new Date(),
        user_id: user.id,
        character_id: characterId,
        id: uuidv4()
      }
    })

    await queryInterface.bulkInsert('users_characters_junction', recordsToInsert);


    await queryInterface.bulkInsert("channel_characters", CHARACTERS);

    const meIndex = users[0].findIndex(user => user.email == "felipemantillagomez@gmail.com")
    const me = users[0][meIndex]


    const meNaranjaJunction = [
      {
        created_at: new Date(),
        updated_at: new Date(),
        user_id: me.id,
        character_id: CHARACTERS[0].id, // naranja id
        id: uuidv4()
      }
    ]

    await queryInterface.bulkInsert('users_characters_junction', meNaranjaJunction);


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users_characters_junction");
    await queryInterface.sequelize.query(`delete from channel_characters where id = '${CHARACTERS[0].id}'`)
  }
};

