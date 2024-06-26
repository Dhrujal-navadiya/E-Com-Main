const express = require("express");
const router = express.Router();

const SellerController = require("../../Controllers/SellerController/SellerController");

router.get("/getAllSeller", SellerController.getallSeller);

router.get("/getSellerById/:id", SellerController.getSellerById);

router.get("/getProductDetails/:id", SellerController.getSellerProductById);

module.exports = router;
