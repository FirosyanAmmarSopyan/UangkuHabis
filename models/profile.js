"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }
  }
  Profile.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Nama Gaboleh Kosong bwang",
          },
          notNull : 
          { msg: "Nama Gaboleh Kosong bwang" },
        }
      },
      birthOfDate: {
        type : DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Tanggal Lahir Gaboleh Kosong bwang",
          },
          notNull : 
          { msg: "Tanggal Lahir Gaboleh Kosong bwang" },
        }
      },
      gender:{
        type : DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Gender Gaboleh Kosong bwang",
          },
          notNull : 
          { msg: "Gender Gaboleh Kosong bwang" },
        }
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
