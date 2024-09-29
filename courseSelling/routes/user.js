const { Router } = require("express");
const { userModel, purchaseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const userMiddleware = require("../middleware/user");

const userRouter = Router();

// Sign up a new user
userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;

  try {
    await userModel.create({
      email,
      password,
      firstName,
      lastName,
    });

    return res.status(201).send({ message: "User created" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ message: "User already exists" });
    }

    return res.status(500).send({ message: "Internal server error" });
  }
});

// Sign in an existing user
userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email, password });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_USER_PASSWORD
    );

    return res.json({ token });
  } else {
    return res.status(403).json({ message: "Invalid credentials" });
  }
});

// Get purchases for the authenticated user
userRouter.get("/purchases", userMiddleware, async function (req, res) {
  const userId = req.userId; // Get userId from middleware

  console.log("User purchases endpoint hit");

  try {
    const purchases = await purchaseModel.find({
      userId,
    });
    res.json({
      purchases,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

let purchasedCourseIds = [];

for(let i = 0; i < purchases.length; i++){
  purchasedCourseIds.push(purchases[i].courseId);
}

// Export the userRouter directly
module.exports = userRouter; // Change made here
