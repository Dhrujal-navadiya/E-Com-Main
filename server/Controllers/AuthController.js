const User = require("../models/authModel");
const createError = require("http-errors");
const { authSchema } = require("../config/validation_schema");
const { signAccessToken } = require("../config/jwt_helper");
const Joi = require("joi");
const bcrypt = require("bcrypt");

module.exports.signup_post = async (req, res) => {
  try {
    const result = await authSchema.validateAsync(req.body);

    const doesExist = await User.findOne({ email: result.email });
    if (doesExist) {
      return res.status(409).json({ error: "Email already exists" }); // Changed to 409 Conflict status and returned response before throwing error
    }

    const user = new User({
      name: result.name,
      email: result.email,
      password: result.password,
      role: result.role,
    });

    const savedUser = await user.save();
    // console.log(savedUser, "savedUUUUUUUUUUUUUUUUUUUUUUUUSER");
    const accessToken = await signAccessToken(savedUser);
    // res.send({ accessToken });
    res
      .status(201)
      .json({ accessToken, message: "User signed up successfully" });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body;

    await Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).validateAsync({ email, password });

    const user = await User.findOne({ email });
    if (!user) throw createError.NotFound("User not registered");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw createError.Unauthorized("Username/password not valid");

    // Fetch the user role from the user object
    const { role } = user;

    // Generate access token
    const accessToken = await signAccessToken(user);
    // console.log(accessToken, "accessToken");

    // Send the access token and role in the response
    res
      .status(201)
      .json({ accessToken, role, message: "User login successfully" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
