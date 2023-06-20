"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "channels",
      "index",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 9999
      },
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('channels', 'index', {});
  },
};
