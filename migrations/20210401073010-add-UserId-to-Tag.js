'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tags', 'UserId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      reference: {
        model: 'Users',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tags', 'UserId')
  }
}
