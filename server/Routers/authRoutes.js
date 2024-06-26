const express = require("express");
const router = express.Router();

const authControllers = require("../Controllers/AuthController");
const jwt_helper = require("../config/jwt_helper");

router.post("/signup", authControllers.signup_post);
router.post("/login", authControllers.login_post);

module.exports = router;
