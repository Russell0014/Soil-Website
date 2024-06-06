module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      onSpecial: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
