#!/usr/bin/env node

/**
 * Brevo (Sendinblue) Email Test Script
 *
 * This script tests Brevo integration WITHOUT modifying your main codebase.
 * Run this to verify Brevo works before integrating it.
 *
 * Usage:
 *   node test-brevo.js
 *
 * Required:
 *   - BREVO_API_KEY environment variable
 */

const https = require("https");

// Configuration - Set these environment variables
const BREVO_API_KEY = process.env.BREVO_API_KEY;

// Test recipients
const TEST_FROM = "noreply@imeldayayala.com.ng"; // Your configured sender
const TEST_TO = "developer@imeldayayala.com.ng"; // Your recipient
const TEST_SUBJECT = "Brevo Test Email - Application System";
const TEST_HTML = `
  <h1>Brevo Test Email</h1>
  <p>If you received this email, Brevo integration is working correctly!</p>
  <p>Test sent at: ${new Date().toISOString()}</p>
`;

/**
 * Send test email using Brevo API
 */
function testBrevo() {
  // Validate configuration
  if (!BREVO_API_KEY) {
    console.error("❌ Error: BREVO_API_KEY environment variable not set");
    console.log("\nTo set it, use:");
    console.log("  export BREVO_API_KEY='your_api_key_here'");
    console.log("  node test-brevo.js");
    console.log("\nWhere to get your API key:");
    console.log("  1. Sign up at https://www.brevo.com/");
    console.log("  2. Go to Settings → SMTP & API");
    console.log("  3. Copy your API Key (v3)");
    process.exit(1);
  }

  console.log("🧪 Testing Brevo Email Service...");
  console.log(`📧 From: ${TEST_FROM}`);
  console.log(`📮 To: ${TEST_TO}`);
  console.log("");

  // Prepare email payload
  const emailPayload = {
    sender: {
      name: "Test System",
      email: TEST_FROM,
    },
    to: [
      {
        email: TEST_TO,
      },
    ],
    subject: TEST_SUBJECT,
    htmlContent: TEST_HTML,
  };

  // Brevo API endpoint
  const url = "https://api.brevo.com/v3/smtp/email";

  const options = {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY,
      "Content-Type": "application/json",
    },
  };

  console.log("🚀 Sending test email via Brevo...");

  const req = https.request(url, options, (res) => {
    let body = "";

    res.on("data", (chunk) => {
      body += chunk;
    });

    res.on("end", () => {
      console.log(`\n📊 Response Status: ${res.statusCode}`);

      try {
        const response = JSON.parse(body);

        if (res.statusCode === 201) {
          console.log("✅ SUCCESS! Email sent via Brevo");
          console.log(`   Message ID: ${response.messageId}`);
          console.log(`\n💡 Next steps:`);
          console.log(`   1. Check ${TEST_TO} for the test email`);
          console.log(`   2. Look in spam folder if not in inbox`);
          console.log(`   3. If received, Brevo integration is ready`);
          console.log(`   4. Update your .env with Brevo credentials`);
          console.log(`   5. Run: npm install sib-api-v3-sdk`);
          process.exit(0);
        } else if (res.statusCode === 400) {
          console.error("❌ Bad Request - Check your payload");
          console.error(`   Response:`, response);
          process.exit(1);
        } else if (res.statusCode === 401) {
          console.error("❌ Unauthorized - API key is invalid or expired");
          console.error(`   Make sure BREVO_API_KEY is correct`);
          process.exit(1);
        } else {
          console.error(`❌ Error ${res.statusCode}`);
          console.error(`   Response:`, response);
          process.exit(1);
        }
      } catch (e) {
        console.error("❌ Error parsing response:", body);
        process.exit(1);
      }
    });
  });

  req.on("error", (error) => {
    console.error("❌ Request Error:", error.message);
    process.exit(1);
  });

  req.write(JSON.stringify(emailPayload));
  req.end();
}

// Run test
testBrevo();
