const db = require("../database");

// Select all product from the database.
exports.all = async (req, res) => {
  const products = await db.product.findAll();

  res.json(products);
};

// Select a single product by its id.
exports.one = async (req, res) => {
  const product = await db.product.findByPk(req.params.id);

  res.json(product);
};

// Create a product in the database.
exports.create = async (req, res) => {
  const product = await db.product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    onSpecial: req.body.onSpecial,
    size: req.body.size,
    unit: req.body.unit,
  });

  res.json(product);
};
