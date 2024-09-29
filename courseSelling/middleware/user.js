const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config"); // Ensure JWT_USER_PASSWORD is being imported correctly

function userMiddleware(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_USER_PASSWORD); // Make sure this environment variable is set
    req.userId = decoded.id; // Ensure you're using 'id' instead of 'Id'
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid credentials" });
  }
}

module.exports = userMiddleware;
