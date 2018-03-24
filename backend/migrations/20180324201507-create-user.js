'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password_digest: {
        allowNull: false,
        type: Sequelize.STRING
      },
      authenticated: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      discogs_username: {
        type: Sequelize.STRING
      },
      oauth_token: {
        type: Sequelize.STRING
      },
      oauth_token_secret: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
