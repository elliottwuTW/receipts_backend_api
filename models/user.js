'use strict'
const {
  Model
} = require('sequelize')
const jwt = require('jsonwebtoken')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.hasMany(models.Receipt)
    }
  }
  User.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User'
  })
  /**
   * Prototype methods
   */
  // get jwt token
  User.prototype.getJwtToken = () => {
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    })
    return token
  }

  return User
}
