const nodemailer = require("nodemailer");
const multer = require("multer");
const {
  generateApplicationHTML,
  travelApplicationSections,
  studentApplicationSections,
} = require("./utils");
require("dotenv").config();

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Middleware to handle file uploads
const handleUpload = (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ error: "File upload error: " + err.message });
    } else if (err) {
      return res
        .status(500)
        .json({ error: "Unknown error during file upload" });
    }
    next();
  });
};

// Configure Nodemailer transporter // @note: gmail email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL_KEY,
    pass: process.env.GMAIL_EMAIL_VALUE,
  },
});

// Configure Nodemailer transporter // @note: custom email config
// const transporter = nodemailer.createTransport({
//   host: "lon113.truehost.cloud", // Replace with your custom domain's SMTP host
//   port: 465, // Commonly used port for SMTP (use 465 for secure connections) or 587 for TLS
//   secure: true, // Set to true if using port 465 for secure connections
//   auth: {
//     user: process.env.CUSTOM_EMAIL_KEY, // Your custom email address
//     pass: process.env.CUSTOM_EMAIL_VALUE, // Your email account password or app-specific password
//   },
// });

async function travelApplicationMailer(req, res) {
  try {
    const data = req.body;
    const files = req.files || [];
    const htmlContent = generateApplicationHTML(
      data,
      travelApplicationSections
    );

    // Prepare attachments array
    const attachments = files.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype,
    }));

    // Configure email options
    const mailOptions = {
      from: "Travel Application System",
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Travel Application from ${data.firstName}`,
      html: htmlContent,
      attachments: attachments,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ error: "Failed to submit application" });
  }
}

async function studentApplicationMailer(req, res) {
  try {
    const data = req.body;
    const htmlContent = generateApplicationHTML(
      data,
      studentApplicationSections
    );

    // Configure email options
    const mailOptions = {
      from: "Student Application System",
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Student Application from ${data.firstName}`,
      html: htmlContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ error: "Failed to submit application" });
  }
}

// Example of how to use the upload middleware in your routes
// const router = express.Router();
// router.post('/travel-application', handleUpload, travelApplicationMailer);
// router.post('/student-application', studentApplicationMailer);

module.exports = {
  handleUpload,
  travelApplicationMailer,
  studentApplicationMailer,
};
