# Deployment Guide

## Environment Variables

When deploying to **Render**, set these environment variables in your service settings:

### SMTP Configuration

```
CUSTOM_EMAIL_HOST=imeldayayala.com.ng
CUSTOM_EMAIL_PORT=587
CUSTOM_EMAIL_SECURE=false
CUSTOM_EMAIL_SMTP_USER=developer@imeldayayala.com.ng
CUSTOM_EMAIL_SMTP_PASS=1bBmnDuMEGfHV55c
CUSTOM_EMAIL_FROM=noreply@imeldayayala.com.ng
CUSTOM_EMAIL_FROM_PASS=WQHs7PCsKqNACGD
RECIPIENT_EMAIL=developer@imeldayayala.com.ng
PORT=3000
```

## Important Notes

### Port Selection

- **Port 587 (TLS/STARTTLS)**: Recommended for cloud providers like Render
  - More compatible with firewall restrictions
  - Set `CUSTOM_EMAIL_SECURE=false`
- **Port 465 (SSL)**: Works on localhost but often blocked on cloud servers
  - Set `CUSTOM_EMAIL_SECURE=true`

### Why it works locally but not on cloud:

1. **Localhost**: Direct network access, no firewall restrictions on port 465
2. **Render**: Cloud provider firewall blocks port 465 (SSL), allows port 587 (TLS)

### Testing

Test your SMTP connection with:

```
GET /api/mailer/test-smtp
```

This endpoint sends a test email to verify the configuration works.

## Troubleshooting

### Connection Timeout

- Check if port is open to your cloud provider
- Try switching between port 465 and 587
- Verify credentials are correct

### Authentication Failed

- Double-check `CUSTOM_EMAIL_SMTP_USER` and `CUSTOM_EMAIL_SMTP_PASS`
- Ensure the email account is active

### Email not received

- Check spam/junk folder
- Verify `RECIPIENT_EMAIL` is correct
- Check sending logs at `/api/mailer/test-smtp`
