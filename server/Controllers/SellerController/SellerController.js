const authModel = require("../../models/authModel");
const CartModel = require("../../models/CartModel");
const Product = require("../../models/ProductModel");

module.exports.getallSeller = async (req, res) => {
  try {
    const seller = await authModel.find({ role: "seller" });
    console.log(seller, "Seller are here");

    if (seller.length === 0) {
      return res.status(404).json({ message: "No seller found" });
    }

    res.status(200).json({ message: "Seller found", seller });
  } catch (error) {
    console.error("Error fetching Seller:", error);
    res.status(500).json({ message: "Error fetching Seller" });
  }
};

module.exports.getSellerById = async (req, res) => {
  try {
    const sellerId = req.params.id;
    console.log("✌️sellerId --->", sellerId);

    const seller = await authModel.findById({ _id: sellerId });
    console.log("✌️seller --->", seller);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    console.log(seller, "seller is here >>>>>>>>>>>>>>");
    res.status(200).json(seller);
  } catch (error) {
    console.error("Error fetching Seller by Id:", error);
    res.status(500).json({ message: "Error fetching Seller by Id" });
  }
};

module.exports.getSellerProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("✌️productId --->", productId);

    // Find the cart that contains the product with the given ID
    const product = await CartModel.findOne({ Product: productId }).populate(
      "Product"
    );
    console.log("✌️cart --->", product);

    if (!product) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching seller details through cart:", error);
    res
      .status(500)
      .json({ message: "Error fetching seller details through cart" });
  }
};
