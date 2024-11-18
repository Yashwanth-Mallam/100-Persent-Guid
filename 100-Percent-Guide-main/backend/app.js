import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import Mongoose from "mongoose";
const log = require("simple-node-logger").createSimpleLogger();
import index from "./routes/index";
import coursesRouter from "./routes/courseRoutes";
const cors = require("cors");
const app = express();
require('dotenv').config();

// MongoDB connection setup
const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/admine";
Mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = Mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("MongoDB Connected");
});

// Middleware setup
app.use(logger("dev"));
app.use(cors({
  origin: 'http://localhost:3000', // Allow React app on localhost:3000
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', coursesRouter); // API route

// Routes
app.use("", index);

// Register route handler
app.post("/api/tutors/register", (req, res) => {
  console.log('Received registration request:', req.body);
  res.status(200).json({ success: true });
});

// Error handling middleware
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({ message: err });
});

// Server setup
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log.info(`App is running at http://localhost:${port}`);
});
