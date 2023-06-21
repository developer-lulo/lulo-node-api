"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "channel_messages",
      "source_channel_id",
      {
        type: Sequelize.STRING(128),
        allowNull: true,
        references: {
          model: "channels",
          key: "id",
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      {}
    );

    await queryInterface.sequelize.query(
      `UPDATE channel_messages SET source_channel_id = channel_id`
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('channel_messages', 'source_channel_id', {});
  },
};
