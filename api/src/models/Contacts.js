const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("contacts", {
    alias: {
      type: DataTypes.STRING,
    },
  });
};
