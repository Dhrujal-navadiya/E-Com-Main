const express = require("express");
const router = express.Router();
const categoryController = require("../../Controllers/SellerController/CategoryController");

router.post("/categories", categoryController.createCategory);
router.get("/getallCategory", categoryController.getAllCategory);

module.exports = router;
