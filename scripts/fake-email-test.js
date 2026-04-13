import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// read .env for FROM if present
let from = 'Ticketly <onboarding@resend.dev>';
try {
  const raw = fs.readFileSync(path.resolve(process.cwd(), '.env'), 'utf8');
  const m = raw.match(/^RESEND_FROM=(.*)$/m);
  if (m) from = m[1].replace(/(^"|"$)/g, '').trim();
} catch (e) {}

(async () => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const to = process.argv[2] || 'lavasha2@hotmail.com';
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject: 'Ticketly — fake invite (Ethereal test)',
      html: '<p>This is a fake invite sent via Ethereal for testing. Use the preview link to view it.</p>',
    });
    console.log('Sent message id:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error('Failed to send fake email:', err);
    process.exitCode = 1;
  }
})();
