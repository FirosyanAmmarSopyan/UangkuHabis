'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "username Gaboleh Kosong bwang",
        },
        notNull : 
        { msg: "Username Gaboleh Kosong bwang" },
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password Gaboleh Kosong bwang",
        },
        notNull : 
        { msg: "password Gaboleh Kosong bwang" },
      }
    },
    roles: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Roles Gaboleh Kosong bwang",
        },
        notNull : 
        { msg: "Roles Gaboleh Kosong bwang" },
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance) => {
        const salt = bcrypt.genSaltSync(8)
        const hash = bcrypt.hashSync(instance.password, salt)

        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};