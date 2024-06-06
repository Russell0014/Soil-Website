module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  // Get all reviews for the single product
  // format ?=product_id="data"&user_id="data"
  router.get("/", controller.getSingleProduct);

  // Create a new review
  router.post("/", controller.create);

  // Modify review
  router.patch("/", controller.edit);

  // Delete review
  router.delete("/", controller.delete);

  app.use("/reviews", router);
};
