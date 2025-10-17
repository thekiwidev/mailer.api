const express = require("express");
const {
  travelApplicationMailer,
  studentApplicationMailer,
  handleUpload,
  testSMTPConnection,
} = require("../controllers/mailer");

const router = express.Router();

// Define your routes here
router.post(
  "/mailer/travel-application",
  handleUpload,
  travelApplicationMailer
);
router.post("/mailer/student-application", studentApplicationMailer);

// Test endpoint to verify SMTP connection
router.get("/mailer/test-smtp", testSMTPConnection);

module.exports = router;
