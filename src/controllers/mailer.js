const nodemailer = require("nodemailer");
const multer = require("multer");
const {
  generateApplicationHTML,
  travelApplicationSections,
  studentApplicationSections,
} = require("../utils");
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

// // Configure Nodemailer transporter // @note: gmail email config
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_EMAIL_KEY,
//     pass: process.env.GMAIL_EMAIL_VALUE,
//   },
// });

// Configure Nodemailer transporter // @note: custom email config
const transporter = nodemailer.createTransport({
  host: process.env.CUSTOM_EMAIL_HOST || "imeldayayala.com.ng", // Custom domain SMTP host
  port: process.env.CUSTOM_EMAIL_PORT || 465, // Port for SMTP (465 for secure, 587 for TLS)
  secure: process.env.CUSTOM_EMAIL_SECURE !== "false", // true for port 465, false for port 587
  auth: {
    user: process.env.CUSTOM_EMAIL_SMTP_USER, // SMTP authentication user
    pass: process.env.CUSTOM_EMAIL_SMTP_PASS, // SMTP authentication password
  },
  connectionTimeout: 30000, // 30 seconds (increased from 15)
  socketTimeout: 30000, // 30 seconds (increased from 15)
  greetingTimeout: 10000, // Greeting timeout
  logger: true, // Enable logging
  debug: false, // Set to true for detailed debugging
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

// Verify transporter connection on startup
console.log("🔧 SMTP Configuration:");
console.log("   Host:", process.env.CUSTOM_EMAIL_HOST);
console.log("   Port:", process.env.CUSTOM_EMAIL_PORT);
console.log("   Secure:", process.env.CUSTOM_EMAIL_SECURE);
console.log("   User:", process.env.CUSTOM_EMAIL_SMTP_USER);

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Error at startup:", error.message);
    console.error("   Error code:", error.code);
    console.error("   Full error:", error);
  } else {
    console.log("✅ SMTP Connection Verified Successfully");
  }
});

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
      from: `"Travel Application System" <${process.env.CUSTOM_EMAIL_FROM}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Travel Application from ${data.firstName}`,
      html: htmlContent,
      attachments: attachments,
      replyTo: process.env.CUSTOM_EMAIL_FROM, // Add replyTo header
    };

    console.log("📧 Sending travel application email to:", mailOptions.to);
    console.log("📤 From:", mailOptions.from);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("❌ Error submitting travel application");
    console.error("   Message:", error.message);
    console.error("   Code:", error.code);
    console.error("   Command:", error.command);
    console.error("   Full stack:", error.stack);

    res.status(500).json({
      error: "Failed to submit application",
      hasError: true,
      errorCode: 500,
      message: error.message,
      errorObj: error,
      diagnostics: {
        timestamp: new Date().toISOString(),
        errorCode: error.code,
        errorCommand: error.command,
      },
    });
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
      from: `"Student Application System" <${process.env.CUSTOM_EMAIL_FROM}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Student Application from ${data.firstName}`,
      html: htmlContent,
      replyTo: process.env.CUSTOM_EMAIL_FROM, // Add replyTo header
    };

    console.log("📧 Sending student application email to:", mailOptions.to);
    console.log("📤 From:", mailOptions.from);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("❌ Error submitting student application");
    console.error("   Message:", error.message);
    console.error("   Code:", error.code);
    console.error("   Command:", error.command);
    console.error("   Full stack:", error.stack);
    console.log("ENV: ", process.env.CUSTOM_EMAIL_FROM);
    console.log("ENV: ", process.env.CUSTOM_EMAIL_FROM_PASS);
    console.log("ENV: ", process.env.RECIPIENT_EMAIL);
    console.log("ENV: ", process.env.CUSTOM_EMAIL_SMTP_USER);
    console.log("ENV: ", process.env.CUSTOM_EMAIL_SMTP_PASS);

    res.status(500).json({
      error: "Failed to submit application",
      hasError: true,
      errorCode: 500,
      message: error.message,
      errorObj: error,
      diagnostics: {
        timestamp: new Date().toISOString(),
        errorCode: error.code,
        errorCommand: error.command,
      },
    });
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
