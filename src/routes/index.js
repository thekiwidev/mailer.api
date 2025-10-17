const express = require("express");
const {
  travelApplicationMailer,
  studentApplicationMailer,
  handleUpload,
  testBrevoConnection,
} = require("../controllers/mailer");

const router = express.Router();

// Define your routes here
router.post(
  "/mailer/travel-application",
  handleUpload,
  travelApplicationMailer
);
router.post("/mailer/student-application", studentApplicationMailer);

// Test endpoint to verify Brevo connection
router.get("/mailer/test-brevo", testBrevoConnection);

module.exports = router;
