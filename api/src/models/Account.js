const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("account", {
      type: {
      type: DataTypes.ENUM("Ahorro pesos", "Corriente pesos", "Ahorro dolares", "Corriente dolares"),
      allowNull: false
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0 
    }
  });
};