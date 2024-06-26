const express = require("express");
const router = express.Router();

const BuyerController = require("../../Controllers/BuyerController/BuyerController");

router.get("/getallBuyer", BuyerController.getallBuyer);

router.get("/getBuyerById/:id", BuyerController.getBuyerById);

module.exports = router;
