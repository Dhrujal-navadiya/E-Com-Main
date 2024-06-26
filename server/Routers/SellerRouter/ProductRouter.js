const express = require("express");
const router = express.Router();

const ProductController = require("../../Controllers/SellerController/ProductController");
const jwt_helper = require("../../config/jwt_helper");
const upload = require("../../config/FileUpload");

router.post(
  "/createProduct",
  upload.single("image"),
  jwt_helper.verifyAccessToken,
  ProductController.createProduct
);
router.get("/getAllProduct", ProductController.getAllProduct);
router.get(
  "/getProduct/:userId",
  jwt_helper.verifyAccessToken,
  ProductController.getProductById
);
router.put("/updateProduct/:id", ProductController.updateProduct);
router.delete("/deleteProduct/:id", ProductController.deleteProduct);

module.exports = router;
