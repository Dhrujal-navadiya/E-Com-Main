const CartModel = require("../../models/CartModel");
const UserModel = require("../../models/authModel");

module.exports.cartProducts = async (req, res, next) => {
  try {
    const { userId, role } = req.payload;
    const {
      seller,
      name,
      price,
      description,
      image,
      Product,
      totalPrice,
      totalItem,
      totalDiscountPrice,
      discount,
      quantity,
      status,
    } = req.body;

    // console.log(req.body, "ho_______________)))))))))))))))))))");

    if (role !== "buyer") {
      return res
        .status(403)
        .json({ error: "Access denied for seller users for" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const productData = {
      name,
      price,
      description,
      image,
      totalPrice,
      totalItem,
      totalDiscountPrice,
      discount,
      quantity,
      status,
    };

    const product = new CartModel({
      Product,
      user: userId,
      seller: seller,
      ...productData,
    });
    console.log("✌️product --__________->", product);
    await product.save();
    res.status(201).json({ message: "Cart added successfully", product });
  } catch (error) {
    console.log("Error fetching cart products", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.findById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Find user by userId
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find cart products by userId
    const cartProducts = await CartModel.find({ user: userId });
    if (!cartProducts) {
      return res.status(404).json({ error: "Cart products not found" });
    }

    res.status(200).json({ user, cartProducts });
  } catch (error) {
    console.log("Error fetching user and cart products:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getAllCartProduct = async (req, res) => {
  try {
    const cartProducts = await CartModel.find();
    res.status(200).json({ cartProducts });
  } catch (error) {
    console.log("Error fetching all cart products:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.UpdateCart = async (req, res) => {
  try {
    const { Product, status } = req.body;
    console.log("✌️req.body --;;;;;;->", Product);

    // Validate input
    if (!Product || !status) {
      return res
        .status(400)
        .json({ error: "ProductId and status are required" });
    }

    // Find and update cart product
    const updatedProduct = await CartModel.findOneAndUpdate(
      { Product },
      {
        status: status,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      message: "Product status updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log("Error updating cart product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
