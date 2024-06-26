const CartModel = require("../../models/CartModel");
const Product = require("../../models/ProductModel");

module.exports.cartProducts = async (req, res) => {
  try {
    // No need to extract userId and role from req.payload

    // Find all cart items
    const cart = await CartModel.find().populate("Product");

    res.status(200).json(cart);
  } catch (error) {
    console.log("Error fetching cart products:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getsellerCartProduct = async (req, res) => {
  const { userId } = req.payload;

  console.log(userId, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

  try {
    const cart = await CartModel.find({ seller: userId });

    console.log("✌️cart --->", cart);
    // console.log(resp, "response");

    if (!cart || cart.length === 0) {
      return res
        .status(404)
        .json({ error: "No cart products found for this seller." });
    }

    return res.status(200).json({ cartProducts: cart });
  } catch (error) {
    console.log("Error getting the cart products:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
