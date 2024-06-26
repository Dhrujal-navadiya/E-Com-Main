const express = require("express");
const router = express.Router();

const sellerCartController = require("../../Controllers/SellerController/SellerCartController");
const jwt_helper = require("../../config/jwt_helper");

router.get(
  "/cartProduct",
  jwt_helper.verifyAccessToken,
  sellerCartController.cartProducts
);

router.get(
  "/getcartSellerProduct",
  jwt_helper.verifyAccessToken,
  sellerCartController.getsellerCartProduct
);

module.exports = router;
