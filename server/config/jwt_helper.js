const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (user) => {
    // console.log(user, "userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    return new Promise((resolve, reject) => {
      const secret = "dhrujal_patel";

      jwt.sign({ userId: user._id, role: user.role }, secret, (err, token) => {
        if (err) {
          console.log("jwt sign in some error");
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const token = authHeader;
    // console.log("token", token);
    jwt.verify(token, "dhrujal_patel", (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },
};
