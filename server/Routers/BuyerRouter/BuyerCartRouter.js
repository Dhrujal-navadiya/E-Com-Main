const express = require("express");
const router = express.Router();

const BuyercartController = require("../../Controllers/BuyerController/BuyerCartController");
const jwt_helper = require("../../config/jwt_helper");

router.post(
  "/cartProduct",
  jwt_helper.verifyAccessToken,
  BuyercartController.cartProducts
);

router.get(
  "/getCartProduct/:userId",
  // jwt_helper.verifyAccessToken,
  BuyercartController.findById
);

router.get(
  "/getAllCartProduct/",
  // jwt_helper.verifyAccessToken,
  BuyercartController.getAllCartProduct
);

router.put(
  "/updateCartProduct",
  // jwt_helper.verifyAccessToken,
  BuyercartController.UpdateCart
);

module.exports = router;
