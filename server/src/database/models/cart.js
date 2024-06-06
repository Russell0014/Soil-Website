module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "cart",
    {
      cart_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Added the foreign key explicitly:
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users', // Reference the 'users' table
          key: 'user_id'  // Reference the 'user_id' column
        }
      }
    },
    {
      timestamps: false,
    }
  );
};