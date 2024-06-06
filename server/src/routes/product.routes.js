module.exports = (express, app) => {
  const controller = require("../controllers/product.controller.js");
  const router = express.Router();

  // Select all products.
  router.get("/", controller.all);

  // Create a new products.
  router.post("/", controller.create);

  // Select a single product by id.
  router.get("/:id", controller.one);

  // Add routes to server.
  app.use("/products", router);
};
