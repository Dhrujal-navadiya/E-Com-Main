const ProductModel = require("../../models/ProductModel");
const User = require("../../models/authModel");

module.exports.createProduct = async (req, res) => {
  try {
    const { userId } = req.payload;
    console.log("✌️userId --->", userId);

    console.log("Uploaded file:", req.file); // Log the uploaded file object

    const product = new ProductModel({
      ...req.body,
      seller: userId,
      image: req.file ? req.file.path : null,
    });
    console.log("✌️product --->", product);

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product", error });
  }
};

module.exports.getAllProduct = async (req, res) => {
  try {
    const products = await ProductModel.find();
    // console.log(products, "hello prodcut");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error get product:", error);
    res.status(500).json({ message: "Error get product", error });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId, "userId >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    const products = await ProductModel.find({ seller: userId });

    if (products.length === 0) {
      console.log("No products found for the user+++++");
      return res
        .status(404)
        .json({ message: "No products found for the user >>>" });
    }

    // console.log("Products:", products);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error get product by id in:", error);
    res.status(500).json({ message: "Error get product by id in", error });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductData = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      updatedProductData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json("Product updated successfully");
  } catch (error) {
    console.error("Error in update product:", error);
    res.status(500).json({ message: "Error in update product", error });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json("Product deleted successfully");
  } catch (error) {
    console.error("Error in delete product:", error);
    res.status(500).json({ message: "Error in delete product", error });
  }
};
