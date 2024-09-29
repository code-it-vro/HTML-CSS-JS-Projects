const { Router } = require("express");
const userMiddleware = require("../middleware/user"); // Ensure correct import
const { purchaseModel, courseModel } = require("../db"); // Ensure models are correctly imported

const courseRouter = Router(); // Create a new router instance

// Route to purchase a course
courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  const userId = req.userId; // Get userId from middleware
  const courseId = req.body.courseId; // Get courseId from request body

  try {
    await purchaseModel.create({
      userId,
      courseId,
    });

    // Response to indicate success
    res.json({
      message: "You have successfully bought this course",
    });
  } catch (error) {
    // Handle potential errors during purchase
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get course previews
courseRouter.get("/preview", async (req, res) => {
  try {
    const courses = await courseModel.find({}); // Fetch all courses
    res.json({
      courses: courses,
    });
  } catch (error) {
    // Handle potential errors during fetching courses
    res.status(500).json({ message: "Internal server error" });
  }
});

// Export the courseRouter
module.exports = courseRouter;
