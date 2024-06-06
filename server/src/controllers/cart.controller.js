const db = require("../database");
const user = require("../database/models/user");

const createCart = async (user_id) => {
  try {
    return await db.cart.create({
      user_id: user_id || null,
    });
  } catch (error) {
    console.error("Error in createCart:", error);
  }
};

async function validateUserID(user_id) {
  if (!user_id) return ""; // skip anon users can add to cart

  const existingUser = await db.users.findOne({
    where: { user_id: user_id },
  });
  if (!existingUser) return "User not found";

  return "";
}

exports.createOrFindCart = async (req, res) => {
  try {
    const { cart_id, user_id } = req.body;

    // wont bother checking if the user_id maps to the same cart_id

    const idInvalid = await validateUserID(user_id);
    if (idInvalid) {
      res.status(400).json({ error: idInvalid });
      return;
    }

    let cart = null;
    // find an existing cart based on cart_id or user_id
    if (cart_id) cart = await db.cart.findByPk(cart_id);
    else if (user_id)
      cart = await db.cart.findOne({ where: { user_id: user_id } });

    // if no carts created above, make one
    if (!cart) cart = await createCart(user_id);

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error in createOrFindCart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addItemToCart = async (req, res) => {
  try {
    const [item, created] = await db.cart_products.findOrCreate({
      where: {
        cart_id: req.body.cart_id,
        product_id: req.body.product_id,
      },
      defaults: {
        quantity: req.body.quantity,
      },
    });

    if (!created) {
      item.quantity += req.body.quantity;
      await item.save();
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the item to the cart" });
  }
};

exports.deleteItemFromCart = async (req, res) => {
  try {
    const item = await db.cart_products.findOne({
      where: {
        cart_id: req.query.cart_id,
        product_id: req.query.product_id,
      },
    });

    if (item) {
      await item.destroy();
      res.json({ message: "Item removed from cart" });
    } else {
      res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while removing the item from the cart",
    });
  }
};

exports.updateItemQuantity = async (req, res) => {
  try {
    const item = await db.cart_products.findOne({
      where: {
        cart_id: req.body.cart_id,
        product_id: req.body.product_id,
      },
    });

    if (item) {
      item.quantity = req.body.quantity;
      await item.save();
      res.json(item);
    } else {
      res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the item quantity" });
  }
};

exports.checkProductInCart = async (req, res) => {
  try {
    const item = await db.cart_products.findOne({
      where: {
        cart_id: req.query.cart_id,
        product_id: req.query.product_id,
      },
    });

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while checking if the product is in the cart",
    });
  }
};

//get all the products and quantity from cart id
exports.getCart = async (req, res) => {
  try {
    const cart = await db.cart_products.findAll({
      where: {
        cart_id: req.query.cart_id,
      },
      include: [
        {
          model: db.product,
          as: "Product", // use the same alias as defined in your association
          attributes: ["image", "name", "price", "unit", "size"], // specify the columns you want from the products table
        },
      ],
    });

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while getting the cart" });
  }
};

//empty the users cart
exports.emptyCart = async (req, res) => {
  try {
    const { cart_id, user_id } = req.query;

    // for non-logged in users remove their cart_ids
    if (!user_id)
      await db.cart.destroy({
        where: {
          cart_id: cart_id,
        },
      });

    const cart = await db.cart_products.destroy({
      where: {
        cart_id: cart_id,
      },
    });

    res.status(200).json({ message: "Cart emptied" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while emptying the cart" });
  }
};
