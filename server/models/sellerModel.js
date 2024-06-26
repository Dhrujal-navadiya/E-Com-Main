const mongoose = require("mongoose");

const productSellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: String,
    phoneNumber: String,
    role: {
      type: String,
      enum: ["admin", "seller"],
      default: "seller",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const ProductSeller = mongoose.model("Seller", productSellerSchema);

module.exports = ProductSeller;
