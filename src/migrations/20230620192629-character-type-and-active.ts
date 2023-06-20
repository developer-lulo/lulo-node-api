"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "channel_characters",
      "is_active",
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      {}
    );
    await queryInterface.sequelize.query("update channel_characters set is_active = false where 1 "); // eslint-disable-line

    await queryInterface.addColumn(
      "channel_characters",
      "action",
      {
        type: Sequelize.STRING(128),
        allowNull: false,
        defaultValue: 'CREATE_NEW'
      },
      {}
    );
    await queryInterface.sequelize.query("update channel_characters set action = 'CREATE_NEW' where 1"); // eslint-disable-line

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('channel_characters', 'is_active', {});
    await queryInterface.removeColumn('channel_characters', 'action', {});
  },
};
