const express = require("express");
const {
  travelApplicationMailer,
  studentApplicationMailer,
} = require("./mailer");

const router = express.Router();

// Define your routes here
router.post("/mailer/travel-application", travelApplicationMailer);
router.post("/mailer/student-application", studentApplicationMailer);

module.exports = router;
