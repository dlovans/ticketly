# Resend setup for Ticketly

This project uses Resend for transactional email (invites, ticket notifications). If you're seeing errors like "You can only send testing emails to your own email address" or 403 validation errors, follow the steps below.

1. Verify an email domain in Resend
   - Go to https://resend.com/domains and add your sending domain (e.g. `yourdomain.com`).
   - Follow Resend's instructions to publish the required DNS records (SPF/DKIM).
   - Once verified, you can send emails to arbitrary recipients using addresses on that domain.

2. Set the correct environment variables
   - Create a `.env` file in the project root (copy `.env.example`) and set:
     - `RESEND_API_KEY` — your Resend API key
     - `RESEND_FROM` — an email using your verified domain, e.g. `Ticketly <onboarding@yourdomain.com>`
   - For production, set the same env vars in your hosting provider (Vercel/Netlify/Render) under Project → Environment Variables and redeploy.

3. Restart the dev server
   - `npm run dev` to pick up `.env` in local dev.

4. Test sending
   - Use the included script to test the API key directly:
     ```bash
     node scripts/resend-test.js
     ```
   - Or POST to the app endpoint:
     ```bash
     curl -X POST http://localhost:5173/api/invites/send-email \
       -H "Content-Type: application/json" \
       -d '{"to":"you@yourdomain.com","freelancerName":"Test","companyName":"ACME"}'
     ```

Notes
- While your Resend account is in test mode, you can only send to your registered account email. To send to other recipients you must verify a domain or upgrade your account.
- The project reads `RESEND_FROM` (if set) and `RESEND_API_KEY` from `$env/static/private` at build/runtime; ensure these are set before starting the server.
