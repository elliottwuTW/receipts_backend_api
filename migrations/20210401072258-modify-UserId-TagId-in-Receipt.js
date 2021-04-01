'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Receipts', 'UserId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: {
        model: 'Users',
        key: 'id'
      }
    })
    await queryInterface.changeColumn('Receipts', 'TagId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: {
        model: 'Tags',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Receipts', 'UserId', {
      allowNull: false,
      type: Sequelize.INTEGER
    })
    await queryInterface.changeColumn('Receipts', 'TagId', {
      allowNull: false,
      type: Sequelize.INTEGER
    })
  }
}
