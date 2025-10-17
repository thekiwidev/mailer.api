const SibApiV3Sdk = require("sib-api-v3-sdk");
const multer = require("multer");
const {
  generateApplicationHTML,
  travelApplicationSections,
  studentApplicationSections,
} = require("../utils");
require("dotenv").config();

// Configure Brevo API
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

// Initialize Brevo Transactional Email API
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

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

// Verify Brevo configuration
console.log("🔧 Brevo Configuration:");
console.log("   API Key:", process.env.BREVO_API_KEY ? "✅ Set" : "❌ Not set");
console.log("   From Email:", process.env.CUSTOM_EMAIL_FROM);
console.log("   Recipient Email:", process.env.RECIPIENT_EMAIL);
console.log("🔍 Testing Brevo connection...");

// Test Brevo connection
apiInstance
  .sendTransacEmail({
    sender: {
      name: "Test",
      email: process.env.CUSTOM_EMAIL_FROM || "noreply@imeldayayala.com.ng",
    },
    to: [
      {
        email: process.env.RECIPIENT_EMAIL || "developer@imeldayayala.com.ng",
      },
    ],
    subject: "Brevo Configuration Test",
    htmlContent: "<p>This is a configuration test email.</p>",
  })
  .then(() => {
    console.log("✅ Brevo Connection Verified Successfully");
  })
  .catch((error) => {
    console.error("❌ Brevo Connection Error:", error.message);
  });

async function travelApplicationMailer(req, res) {
  try {
    const data = req.body;
    const files = req.files || [];
    const htmlContent = generateApplicationHTML(
      data,
      travelApplicationSections
    );

    // Prepare attachments array for Brevo
    const attachments = files.map((file) => ({
      name: file.originalname,
      content: file.buffer.toString("base64"),
      type: file.mimetype,
    }));

    // Configure email for Brevo
    const sendSmtpEmail = {
      sender: {
        name: "Travel Application System",
        email: process.env.CUSTOM_EMAIL_FROM || "noreply@imeldayayala.com.ng",
      },
      to: [
        {
          email: process.env.RECIPIENT_EMAIL || "developer@imeldayayala.com.ng",
        },
      ],
      subject: `New Travel Application from ${data.firstName}`,
      htmlContent: htmlContent,
      attachment: attachments,
      replyTo: {
        email: process.env.CUSTOM_EMAIL_FROM || "noreply@imeldayayala.com.ng",
      },
    };

    console.log(
      "📧 Sending travel application email to:",
      sendSmtpEmail.to[0].email
    );
    console.log("📤 From:", sendSmtpEmail.sender.email);

    // Send email via Brevo
    const info = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent successfully:", info.messageId);
    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("❌ Error submitting travel application");
    console.error("   Message:", error.message);
    console.error("   Code:", error.code);

    res.status(500).json({
      error: "Failed to submit application",
      hasError: true,
      errorCode: 500,
      message: error.message,
      diagnostics: {
        timestamp: new Date().toISOString(),
        errorCode: error.code,
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

    // Configure email for Brevo
    const sendSmtpEmail = {
      sender: {
        name: "Student Application System",
        email: process.env.CUSTOM_EMAIL_FROM || "noreply@imeldayayala.com.ng",
      },
      to: [
        {
          email: process.env.RECIPIENT_EMAIL || "developer@imeldayayala.com.ng",
        },
      ],
      subject: `New Student Application from ${data.firstName}`,
      htmlContent: htmlContent,
      replyTo: {
        email: process.env.CUSTOM_EMAIL_FROM || "noreply@imeldayayala.com.ng",
      },
    };

    console.log(
      "📧 Sending student application email to:",
      sendSmtpEmail.to[0].email
    );
    console.log("📤 From:", sendSmtpEmail.sender.email);

    // Send email via Brevo
    const info = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent successfully:", info.messageId);
    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("❌ Error submitting student application");
    console.error("   Message:", error.message);
    console.error("   Code:", error.code);

    res.status(500).json({
      error: "Failed to submit application",
      hasError: true,
      errorCode: 500,
      message: error.message,
      diagnostics: {
        timestamp: new Date().toISOString(),
        errorCode: error.code,
      },
    });
  }
}

module.exports = {
  handleUpload,
  travelApplicationMailer,
  studentApplicationMailer,
  testBrevoConnection: async (req, res) => {
    try {
      console.log("🧪 Testing Brevo connection...");
      const testMail = {
        sender: {
          name: "Brevo Test",
          email: process.env.CUSTOM_EMAIL_FROM || "noreply@imeldayayala.com.ng",
        },
        to: [
          {
            email:
              process.env.RECIPIENT_EMAIL || "developer@imeldayayala.com.ng",
          },
        ],
        subject: "Brevo Connection Test",
        htmlContent:
          "<p>If you receive this email, Brevo is working correctly!</p>",
      };

      const info = await apiInstance.sendTransacEmail(testMail);
      console.log("✅ Test email sent:", info.messageId);
      res.status(200).json({
        success: true,
        message: "Test email sent successfully",
        messageId: info.messageId,
        testMailConfig: {
          from: testMail.sender.email,
          to: testMail.to[0].email,
        },
      });
    } catch (error) {
      console.error("❌ Brevo Test Failed:", error.message);
      res.status(500).json({
        success: false,
        error: "Brevo test failed",
        message: error.message,
        code: error.code,
      });
    }
  },
};
