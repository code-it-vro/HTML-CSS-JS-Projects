const express = require("express"); // exporting the requiered things
const jwt = require("jsonwebtoken");
const JWT_SECRET = "codeitvro";

const app = express(); // necessary steps to initiate the express
app.use(express.json()); // it will parse the data into json its a kind of middleware only

let users = []; // storing our users in this global array

// Signup endpoint
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password; // Fixed typo in password field

  users.push({
    username,
    password,
  });

  res.send({
    message: "You got signed up on the website",
  });
});

// Signin endpoint
app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Corrected user lookup logic
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = jwt.sign({ username: user.username }, JWT_SECRET);
    user.token = token; // Optional: storing token in user object (not necessary)

    res.send({ token });
  } else {
    res.status(403).send({
      message: "Invalid credentials",
    });
  }
});

// Protected route (requires valid JWT)
app.get("/me", (req, res) => {
  const authHeader = req.headers.authorization; // Extract Bearer token from Authorization header
  if (!authHeader) {
    return res.status(401).send({ message: "Token not provided" });
  }

  // Extract the token part from "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Token format is incorrect" });
  }

  try {
    const userDetails = jwt.verify(token, JWT_SECRET); // Verify token
    const username = userDetails.username;
    const user = users.find((user) => user.username === username);

    if (user) {
      res.send({ username: user.username });
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(401).send({ message: "Invalid token" });
  }
});

// Start server
app.listen(3000, () => console.log("Server is running on port 3000"));
