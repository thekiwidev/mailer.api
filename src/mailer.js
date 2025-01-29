const nodemailer = require("nodemailer");
const {
  generateApplicationHTML,
  travelApplicationSections,
  studentApplicationSections,
} = require("./utils");
require("dotenv").config();

// Configure Nodemailer transporter (example using Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_KEY || "adedotun.gab@gmail.com",
    pass: process.env.EMAIL_VALUE || "$tr0ngP@$$",
  },
});

async function travelApplicationMailer(req, res) {
  const data = req.body;
  const htmlContent = generateApplicationHTML(data, travelApplicationSections);

  // Configure email options
  const mailOptions = {
    from: '"Travel Application System": New Application',
    to: process.env.RECIPIENT_EMAIL || "adedotungabriel20@gmail.com", // Your recipient email
    subject: `New Travel Application from ${data.firstName}`,
    html: htmlContent,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ error: "Failed to submit application" });
  }
}

async function studentApplicationMailer(req, res) {
  const data = req.body;
  const htmlContent = generateApplicationHTML(data, studentApplicationSections);

  // Configure email options
  const mailOptions = {
    from: '"Student Application System": New Application',
    to: process.env.RECIPIENT_EMAIL || "adedotungabriel20@gail.com",
    subject: `New Student Application from ${data.firstName}`,
    html: htmlContent,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ error: "Failed to submit application" });
  }
}

module.exports = {
  travelApplicationMailer,
  studentApplicationMailer,
};
