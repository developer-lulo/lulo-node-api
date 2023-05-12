"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "channels",
      "channel_status",
      {
        type: Sequelize.STRING(64),
        allowNull: true,
      },
      {}
    );

    await queryInterface.sequelize.query("update channels set channel_status = 'INUSE' where 1 "); // eslint-disable-line

  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("channels", "channel_status", {});
  },
};
