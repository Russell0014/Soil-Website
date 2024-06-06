const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          min: 5,
          max: 30,
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      date_joined: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        validate: {
          isDate: true,
        },
      },
    },
    {
      timestamps: false,
    }
  );
