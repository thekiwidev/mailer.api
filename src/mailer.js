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

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_KEY || "temp.user@email.com",
    pass: process.env.EMAIL_VALUE || "$tr0ngP@$$",
  },
});

async function travelApplicationMailer(req, res) {
  try {
    const data = req.body;
    const files = req.files || [];
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Travel Application</title>
      </head>
      <body>
        ${generateApplicationHTML(data, travelApplicationSections)}
      </body>
      </html>
    `;

    // Prepare attachments array
    const attachments = files.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype,
    }));

    // Configure email options
    const mailOptions = {
      from: '"Travel Application System" <noreply@travelapp.com>',
      to: process.env.RECIPIENT_EMAIL || "recipient@email.com",
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
      from: '"Student Application System" <noreply@studentapp.com>',
      to: process.env.RECIPIENT_EMAIL || "recipient@email.com",
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
