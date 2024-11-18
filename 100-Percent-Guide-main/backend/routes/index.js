import express from "express";
var router = express.Router();

import indexRoute from "./indexRoute"; // Main or homepage routes
import tutorRoutes from "./tutorRoutes"; // Routes for tutors
import courseRoutes from "./courseRoutes"; // Routes for courses
import videoRoutes from "./videoRoutes"; // Routes for videos

// Optional: Add global middleware here if needed
router.use((req, res, next) => {
  console.log(`Request received at ${req.originalUrl}`);
  next();
});

// Define route handlers
router.use("/", indexRoute); // Root route (e.g., homepage or index)
router.use("/tutors", tutorRoutes); // Tutor-related routes (e.g., /tutors)
router.use("/courses", courseRoutes); // Course-related routes (e.g., /courses)
router.use("/videos", videoRoutes); // Video-related routes (e.g., /videos)

export default router;
