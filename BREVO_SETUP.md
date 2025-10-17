# Brevo Integration Guide

## Why Brevo?

Brevo (formerly Sendinblue) is perfect for your use case:

- ✅ Works reliably on Render and cloud platforms
- ✅ No port blocking issues (uses HTTPS)
- ✅ Easy to integrate
- ✅ Free tier: 300 emails/day
- ✅ Nigerian support options
- ✅ Great documentation
- ✅ Email tracking and analytics

## Step 1: Get Brevo Credentials

### Sign Up:

1. Go to https://www.brevo.com/
2. Click "Sign up for free"
3. Create account with your email
4. Verify your email address

### Get API Key:

1. Log in to Brevo dashboard
2. Click on your name → **Settings**
3. Go to **SMTP & API** (left sidebar)
4. Look for **API Key** section
5. Copy your **API Key v3** (long string starting with `xsmtpsib-`)

## Step 2: Test Brevo (Without Code Changes)

Test if Brevo works BEFORE integrating:

```bash
# Set your Brevo API Key
export BREVO_API_KEY="your_api_key_here"

# Run the test script
node test-brevo.js
```

### Expected Output if Successful:

```
🧪 Testing Brevo Email Service...
📧 From: noreply@imeldayayala.com.ng
📮 To: developer@imeldayayala.com.ng

🚀 Sending test email via Brevo...

📊 Response Status: 201
✅ SUCCESS! Email sent via Brevo
   Message ID: <long-id>

💡 Next steps:
   1. Check developer@imeldayayala.com.ng for the test email
   2. Look in spam folder if not in inbox
   3. If received, Brevo integration is ready
   4. Update your .env with Brevo credentials
   5. Run: npm install sib-api-v3-sdk
```

### What to Check:

1. **Check your email** at `developer@imeldayayala.com.ng`
2. **Look in spam folder** if not in inbox
3. **If received** → Brevo is working ✅

## Step 3: Verify Sender Email (Important)

Before sending production emails, verify your sender email in Brevo:

1. In Brevo dashboard → **Senders**
2. Add your sender email: `noreply@imeldayayala.com.ng`
3. Click verification link sent to that email
4. Once verified, you can send from that address

## Step 4: Implementation Plan (For Later)

Once Brevo test passes, the code changes needed:

### Install Brevo SDK:

```bash
npm install sib-api-v3-sdk
```

### Update .env:

```
BREVO_API_KEY=xsmtpsib-xxx...
CUSTOM_EMAIL_FROM=noreply@imeldayayala.com.ng
RECIPIENT_EMAIL=developer@imeldayayala.com.ng
```

### Code Changes:

Replace Nodemailer with Brevo in `mailer.js`:

- Same function names (`travelApplicationMailer`, `studentApplicationMailer`)
- Same behavior, different backend
- Function signatures stay the same

## Step 5: Deployment on Render

Add to Render environment variables:

```
BREVO_API_KEY=xsmtpsib-xxx...
CUSTOM_EMAIL_FROM=noreply@imeldayayala.com.ng
RECIPIENT_EMAIL=developer@imeldayayala.com.ng
```

## Comparison: Brevo vs Current Setup

| Feature      | Current (SMTP)  | Brevo (API)      |
| ------------ | --------------- | ---------------- |
| Protocol     | SMTP (port 465) | HTTPS (REST API) |
| Localhost    | ✅ Works        | ✅ Works         |
| Render Cloud | ❌ Blocked      | ✅ Works         |
| Port Issues  | ❌ Yes          | ✅ No            |
| Setup Time   | 5 min           | 10 min           |
| Free Tier    | No              | 300 emails/day   |
| Tracking     | Limited         | Advanced         |
| Support      | Limited         | Excellent        |

## Brevo API Endpoints

### Send Email:

```
POST https://api.brevo.com/v3/smtp/email
Header: api-key: your_api_key
```

### Get Account Info:

```
GET https://api.brevo.com/v3/account
Header: api-key: your_api_key
```

## Troubleshooting

| Error                   | Solution                               |
| ----------------------- | -------------------------------------- |
| `401 Unauthorized`      | API key is invalid or expired          |
| `400 Bad Request`       | Check email format or sender address   |
| `Email not received`    | Verify sender email in Brevo dashboard |
| `BREVO_API_KEY not set` | Run: `export BREVO_API_KEY='your_key'` |

## Next Steps

1. ✅ Sign up at https://www.brevo.com/
2. ✅ Get your API Key from Settings → SMTP & API
3. ✅ Run: `export BREVO_API_KEY="your_key"` && `node test-brevo.js`
4. ✅ Check if test email arrives
5. ✅ Verify sender email in Brevo dashboard
6. ✅ Report results (don't modify code yet!)

---

**Note**: This test script uses the Brevo REST API directly, no npm packages needed for testing!
