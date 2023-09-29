'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User)
      Transaction.belongsToMany(models.Product, {through: models.ProductTransaction})
    }
    
  
  }
  Transaction.init({
    date: DataTypes.DATE,
    quantity: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(instance) {
        instance.date = new Date()
      }
    },
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};