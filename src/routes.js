const express = require("express");
const {
  travelApplicationMailer,
  studentApplicationMailer,
  handleUpload,
} = require("./mailer");

const router = express.Router();

// Define your routes here
router.post(
  "/mailer/travel-application",
  handleUpload,
  travelApplicationMailer
);
router.post("/mailer/student-application", studentApplicationMailer);

module.exports = router;
