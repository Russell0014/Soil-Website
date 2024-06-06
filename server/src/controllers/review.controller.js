const { Sequelize, where } = require("sequelize");
const db = require("../database");
const { validateUserID } = require("../utils/users");
const validate = require("validator");

// Get all reviews for the single product
exports.getSingleProduct = async (req, res) => {
  const { product_id, user_id } = req.query;

  try {
    const whereQuery = {
      product_id: product_id,
    };

    if (user_id) {
      const idInvalid = await validateUserID(user_id);
      if (idInvalid) {
        res.status(500).json({ message: idInvalid });
        return;
      }
      // add to query
      whereQuery.user_id = user_id;
    }
    const productReviews = await db.review.findAll({
      where: whereQuery,
      include: [{
        model: db.users,
        as: 'User',
        attributes: ['username'],
      }],
    });
    // a non existent product_id will return []
    res.status(200).json(productReviews);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new review
exports.create = async (req, res) => {
  const { user_id, product_id, title, description, stars } = req.body;
  try {
    const idInvalid = await validateUserID(user_id);
    if (idInvalid) {
      res.status(500).json({ message: idInvalid });
      return;
    }

    // validate product_id
    const productIdValid = await db.product.findByPk(product_id);
    if (!productIdValid) {
      res.status(500).json({ message: "Invalid product_id!" });
      return;
    }

    // check if the user has already created one
    const review = await db.review.findAll({
      where: {
        user_id: user_id,
        product_id: product_id,
      },
    });
    if (review.length > 0) {
      res.status(500).json({ message: "Review exists, use PATCH method" });
      return;
    }

    const titleTrimmed = title.trim();
    if (
      !titleTrimmed ||
      !validate.isLength(titleTrimmed, { min: 5, max: 100 })
    ) {
      res.status(500).json({ message: "Invalid product review title!" });
      return;
    }

    const descriptionTrimmed = description.trim();
    const wordCount = descriptionTrimmed.split(" ").length;

    if (
      !descriptionTrimmed ||
      !validate.isLength(descriptionTrimmed, { min: 5, max: 450 }) ||
      wordCount < 5 ||
      wordCount > 100
    ) {
      res.status(500).json({ message: "Invalid product review description!" });
      return;
    }
    if (stars < 1 || stars > 5) {
      res.status(500).json({ message: `Invalid star rating! stars, ${stars}` });
      return;
    }

    await db.review.create({
      user_id: user_id,
      product_id: product_id,
      title: titleTrimmed,
      description: descriptionTrimmed,
      stars: stars,
    });

    res.status(200).json({
      message: `Success. user_id: ${user_id} has reviewed product_id: ${product_id}`,
    });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.edit = async (req, res) => {
  const { user_id, product_id, title, description, stars } = req.body;

  try {
    const idInvalid = await validateUserID(user_id);
    if (idInvalid) {
      res.status(500).json({ message: idInvalid });
      return;
    }

    // validate product_id
    const productIdValid = await db.product.findByPk(product_id);
    if (!productIdValid) {
      res.status(500).json({ message: "Invalid product_id!" });
      return;
    }

    const review = await db.review.findAll({
      where: {
        user_id: user_id,
        product_id: product_id,
      },
    });
    if (review.length <= 0) {
      res
        .status(500)
        .json({ message: "Review does not exist, use POST method" });
      return;
    }

    const titleTrimmed = title.trim();
    if (
      !titleTrimmed ||
      !validate.isLength(titleTrimmed, { min: 5, max: 100 })
    ) {
      res.status(500).json({ message: "Invalid product review title!" });
      return;
    }

    const descriptionTrimmed = description.trim();
    const wordCount = descriptionTrimmed.split(" ").length;

    if (
      !descriptionTrimmed ||
      !validate.isLength(descriptionTrimmed, { min: 5, max: 450 }) ||
      wordCount < 5 ||
      wordCount > 100
    ) {
      res.status(500).json({ message: "Invalid product review description!" });
      return;
    }

    if (stars < 1 || stars > 5) {
      res.status(500).json({ message: `Invalid star rating! stars, ${stars}` });
      return;
    }

    await db.review.update(
      {
        title: titleTrimmed,
        description: descriptionTrimmed,
        stars: stars,
        date: Sequelize.NOW,
      },
      { where: { user_id: user_id, product_id: product_id } }
    );

    res.status(200).json({
      message: `Success. user_id: ${user_id} has modified the review for product_id: ${product_id}`,
    });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete the review
exports.delete = async (req, res) => {
  const { user_id, product_id } = req.query;

  try {
    // not gonna validate user_id and product_id, gonna be done below
    const review = await db.review.findOne({
      where: {
        user_id: user_id,
        product_id: product_id,
      },
    });

    if (!review) {
      res
        .status(500)
        .json({ message: "Review does not exist, use POST method!" });
      return;
    }

    await review.destroy();
    res.status(200).json({
      message: `user_id: ${user_id} review for product_id: ${product_id} removed!`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};
