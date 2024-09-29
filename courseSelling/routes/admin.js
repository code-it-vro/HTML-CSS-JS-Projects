const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config"); // Import from config.js
const adminMiddleware = require("../middleware/admin.js");
const adminRouter = Router();

adminRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;

  try {
    await adminModel.create({
      email,
      password,
      firstName,
      lastName,
    });
  } catch {
    res.status(400).send({ message: "User already exists" });
  }
  res.status(201).send({ message: "User created" });
});

adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const admin = await adminModel.findOne({
    email,
    password,
  });

  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id.toString(),
      },
      JWT_ADMIN_PASSWORD
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

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const { title, description, price, imageUrl } = req.body;
  const course = await courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorID: adminId,
  });

  res.json({
    message: "Your course is created",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;
  const { courseId, title, description, price, imageUrl } = req.body; // Extracting courseId from body

  const course = await courseModel.findOneAndUpdate(
    {
      _id: courseId,
      creatorID: adminId, // Ensure the course belongs to the admin
    },
    {
      title,
      description,
      imageUrl,
      price,
    },
    { new: true } // This returns the updated course
  );

  if (course) {
    res.json({
      message: "The course got updated",
      courseId: course._id,
    });
  } else {
    res.status(404).json({
      message: "Course not found or not authorized",
    });
  }
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
  const adminId = req.userId;
  const courses = await courseModel.find({
    creatorID: adminId,
  });
  res.json({
    message: "Your all courses",
    courses: courses,
  });
});

module.exports = adminRouter;
