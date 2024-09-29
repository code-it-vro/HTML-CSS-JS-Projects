require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Import routers
const userRouter = require("./routes/user"); // This now imports the router directly

const courseRouter = require("./routes/course");
const adminRouter = require("./routes/admin");

// Initialize express app
const app = express();
app.use(express.json());


// Set up routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

// Main function to connect to MongoDB
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
}

// Call main to start the application
main();
