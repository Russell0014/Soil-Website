module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "review",
    {
      // fk
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      // fk
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
          max: 5,
        },
      },
      review_created: {
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
};
