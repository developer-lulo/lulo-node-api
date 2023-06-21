"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "channel_characters",
      "key",
      {
        type: Sequelize.STRING(128),
        allowNull: false,
        defaultValue: 'UN_SET'
      },
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('channel_characters', 'key', {});
  },
};
