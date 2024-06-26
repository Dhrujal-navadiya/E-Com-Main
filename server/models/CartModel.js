const { required } = require("joi");
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller",
    required: true,
  },
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    // required: true,
  },

  image: {
    type: String,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalItem: {
    type: Number,
    required: true,
    default: 0,
  },
  totalDiscountPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    default: "Pending",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
