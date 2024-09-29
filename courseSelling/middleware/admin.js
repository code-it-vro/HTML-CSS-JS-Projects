const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config"); // Import from config.js

function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  try {
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({
      message: "Invalid credentials",
    });
  }
}

module.exports = adminMiddleware;
