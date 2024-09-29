const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";
const { userModel, todoModel } = require("./db");
const mongoose = require("mongoose");
const { z } = require("zod");

mongoose.connect(
  "mongodb+srv://ashutosh:Shukla2001@cluster0.shghjtb.mongodb.net/myTodo2"
);

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  const requieredBody = z.object({
    email: z.string().max(30).email(),
    password: z.string().max(30).min(5),
    name: z.string().max(40).min(3),
  });

  const parsedDatawithSuccess = requieredBody.safeParse(req.body);

  if (!parsedDatawithSuccess.success) {
    res.json({
      message: "Invalid format",
      error: parsedDatawithSuccess.error,
    });
    return;
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  let oneError = false;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);

    await userModel.create({
      email: email,
      password: hashedPassword,
      name: name,
    });
  } catch (error) {
    res.json({
      message: "Email or username already exists",
    });
    oneError = true;
  }
  if (!oneError) {
    res.json({
      message: "You have signed up on the website",
    });
  }
});

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await userModel.findOne({
    email: email,
  });

  const passwordMatch = await bcrypt.compare(password, user.password);

  console.log(user);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Invalid credentials",
    });
  }
});

app.post("/todos", auth, (req, res) => {});

app.get("/todo", auth, (req, res) => {});

function auth(req, res, next) {
  const token = req.headers.token;

  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData) {
    req.userId = decodedData.Id;
    next();
  } else {
    res.status(403).json({
      message: "Invalid credentials",
    });
  }
}

app.listen(3000, () => console.log("Server is running on port 3000"));
