import { Resend } from "resend";
import fs from "fs";
import path from "path";

// Try to read RESEND_API_KEY from process.env first, otherwise load from .env
let apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    const raw = fs.readFileSync(envPath, "utf8");
    const match = raw.match(/^RESEND_API_KEY=(.*)$/m);
    if (match) apiKey = match[1].trim();
  } catch (e) {
    // ignore
  }
}

const r = new Resend(apiKey);

(async () => {
  try {
  console.log("Sending test email to lavasha2@hotmail.com using RESEND_API_KEY from environment or .env...");
    const resp = await r.emails.send({
      from: "Ticketly <onboarding@resend.dev>",
      to: "lavasha2@hotmail.com",
      subject: "Ticketly — test invite",
      html: `<p>This is a test from Ticketly to verify Resend integration.</p>`,
    });
    console.log("Resend response:", resp);
  } catch (err) {
    console.error("Resend error:", err);
    process.exitCode = 1;
  }
})();
