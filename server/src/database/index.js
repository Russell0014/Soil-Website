const { Sequelize, DataTypes } = require("sequelize");
const storeData = require("./store.json");
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');

dotenv.config();

const db = {
  Op: Sequelize.Op,
};

// init db
db.sequelize = new Sequelize(process.env.URI, {
  dialect: "mysql",
  dialectModule: require("mysql2"),

});

// init models
db.users = require("./models/user.js")(db.sequelize, DataTypes);
db.product = require("./models/product.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db.sequelize, DataTypes);
db.cart_products = require("./models/cart_products.js")(
  db.sequelize,
  DataTypes
);
db.review = require("./models/review.js")(db.sequelize, DataTypes);

// set up the relationships
//
db.product.belongsToMany(db.cart, {
  through: db.cart_products,
  foreignKey: "product_id",
});
//
db.cart_products.belongsTo(db.product, {
  foreignKey: "product_id",
  as: "Product", // unique alias
});
// 1:1 relationship, user has 1 cart_id
db.users.hasOne(db.cart, { foreignKey: "user_id" });
// 0:1 relationship, cart can have 0 or 1 users
db.cart.belongsTo(db.users, { foreignKey: "user_id" });

db.cart.belongsToMany(db.product, {
  through: db.cart_products,
  foreignKey: "cart_id",
});

// 1:N relationship, user can review many products
db.users.hasMany(db.review, { foreignKey: "user_id", as: "Reviews" });
db.review.belongsTo(db.users, { foreignKey: "user_id", as: "User" });

// review references a single product, product can be reviewed many times
db.review.belongsTo(db.product, { foreignKey: "product_id" });
db.product.hasMany(db.review, { foreignKey: "product_id" });


db.sync = async () => {
  // Sync schema
  await db.sequelize.sync();

  await seedData();
  await seedUsers();
};

async function seedData() {
  const countProducts = await db.product.count();

  // Only seed data if necessary.
  if (countProducts > 0) return;

  storeData.products.forEach(async (product) => {
    console.log(product);

    await db.product.create({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      onSpecial: product.onSpecial,
      size: product.size,
      unit: product.unit,
    });
  });
}

async function seedUsers() {
  // ! NO VALIDATION IS SET HERE !
  const defaultUsers = [
    {
      username: "test@TEST.com",
      email: "test@TEST.com",
      hash: "test@TEST.com",
    },
    {
      username: "username",
      email: "email@email.com",
      hash: "hash",
    },
    {
      username: "username2",
      email: "email@email.com",
      hash: "!Password123",
    }
  ];

  // simple solution for existing users
  defaultUsers.forEach(async (user) => {
    try {
      user.hash = await bcrypt.hash(user.hash, 1); // 1 salt round
      await db.users.create(user);
    } catch (e) {
      // console.log(e);
      console.log("User exists skip");
    }
  });
}

module.exports = db;
