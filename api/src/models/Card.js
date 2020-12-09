const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("card", {
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    CVC: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expirationDate: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};