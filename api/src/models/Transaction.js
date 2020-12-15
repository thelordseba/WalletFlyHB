const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("transaction", {
    type: {
      type: DataTypes.ENUM("out", "income"),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("Accepted", "Rejected", "Processing")
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
};