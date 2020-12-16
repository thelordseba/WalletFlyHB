const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("transaction", {
    title: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.ENUM("ingreso", "egreso"),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
};