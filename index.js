/**
 * Mailer API - Main Entry Point
 *
 * This is the root entry point for the Mailer API application.
 * It initializes the Express server and connects all related modules.
 *
 * Project Structure:
 * ├── index.js                    (This file - Main entry point)
 * ├── src/
 * │   ├── routes/
 * │   │   └── index.js            (API route definitions)
 * │   ├── controllers/
 * │   │   └── mailer.js           (Email transporter and mailer functions)
 * │   ├── utils/
 * │   │   └── index.js            (Utility functions and application section templates)
 * │   ├── config/                 (Configuration files)
 * │   ├── middleware/             (Custom middleware)
 * │   ├── services/               (Business logic services)
 * │   └── templates/              (Email templates)
 */

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Import routes
const router = require("./src/routes/index");

// Initialize Express app
const app = express();

/**
 * CORS Configuration
 * Allows requests from specified origins with specific HTTP methods
 */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // Allow specific origin in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser middleware
app.use(bodyParser.json());

// API routes
app.use("/api", router);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Mailer API is ready to accept requests`);
});
