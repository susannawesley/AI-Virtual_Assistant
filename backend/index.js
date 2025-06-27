// backend/index.js

import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Ensure dotenv is configured at the very top
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors"; // Correct ES module import for cors
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
// import geminiResponse from "./gemini.js"; // This import is not used in index.js, can be removed if not needed elsewhere in this file

const app = express();

// Configure CORS
const allowedOrigins = [
  "http://localhost:5173", // For local development of your frontend
 "https://ai-virtual-assistant-m2w3.onrender.com"// Your deployed frontend URL
  // Add any other specific origins your frontend might be deployed on
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // Crucial for allowing cookies to be sent/received
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Explicitly allow necessary HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Explicitly allow necessary headers
};

app.use(cors(corsOptions)); // Apply the CORS middleware with configured options

const port = process.env.PORT || 5000;

// Middleware for parsing request bodies
app.use(express.json()); // Parses JSON bodies
app.use(cookieParser()); // Parses cookies from the request headers

// Route middleware
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
// If you have other routes (e.g., for Gemini directly, you'd add them here)
// app.use("/api/gemini", geminiRouter);

// Start the server
app.listen(port, () => {
  connectDb(); // Connect to MongoDB
  console.log(`Server started on port ${port}`);
});
