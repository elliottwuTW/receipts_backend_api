'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Receipt.belongsTo(models.User)
      Receipt.belongsTo(models.Tag)
    }
  }
  Receipt.init({
    merchant: {
      allowNull: false,
      type: DataTypes.STRING
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    amount: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    info: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    sn: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      reference: {
        model: 'Users',
        key: 'id'
      }
    },
    TagId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      reference: {
        model: 'Tags',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Receipt'
  })
  return Receipt
}
