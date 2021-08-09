'use strict';
const category = require('../config/category')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Ad.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement : true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    price: DataTypes.FLOAT,
    category: DataTypes.ENUM(category),
    city: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ad',
  });
  return Ad;
};