const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    birthdate: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, //Min 8 caracteres, 1 number, 1 uppercase
      },
      get() {
        return () => this.getDataValue("password");
      },
    }, 
    documentType: {
      type: DataTypes.STRING,
    },
    documentNumber: {
      type: DataTypes.INTEGER,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    addressNumber: {
      type: DataTypes.INTEGER,
    },
    postalCode:{
      type: DataTypes.INTEGER,
    },
    city:{
      type: DataTypes.STRING,
    },
    province:{
      type: DataTypes.STRING,
    },
    country:{
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue("salt");
      },
    },
    segNumber: {
      type: DataTypes.INTEGER,
      get() {
        return () => this.getDataValue("segNumber");
      },
    },
  });
};

