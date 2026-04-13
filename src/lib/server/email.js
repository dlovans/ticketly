import { Resend } from "resend";
import { RESEND_API_KEY, RESEND_FROM, USE_FAKE_EMAIL, ORIGIN } from "$env/static/private";
import nodemailer from "nodemailer";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const FROM_ADDRESS = RESEND_FROM || "Ticketly <onboarding@resend.dev>";

// Simple cached Ethereal transporter for local fake sending
let _ethTransport;
async function sendViaEthereal({ to, subject, html }) {
    if (!_ethTransport) {
        // createTestAccount creates credentials on the fly for ethereal.email
        const testAccount = await nodemailer.createTestAccount();
        _ethTransport = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
    }

    const info = await _ethTransport.sendMail({
        from: FROM_ADDRESS,
        to,
        subject,
        html,
    });

    // nodemailer provides a preview URL for ethereal
    const preview = nodemailer.getTestMessageUrl(info);
    console.log("Ethereal preview URL:", preview);
    return { data: { id: info.messageId, previewUrl: preview } };
}

/**
 * Send a notification email when a new ticket is assigned to a freelancer.
 */
export async function sendTicketNotificationEmail({ to, clientName, ticketTitle, priority }) {
    const subject = `New ticket from ${clientName}: ${ticketTitle}`;

    const priorityColor = {
        Low: "#16a34a",
        Medium: "#ca8a04",
        High: "#dc2626",
        Emergency: "#991b1b",
    }[priority] || "#6b7280";

    const html = `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
            <h2 style="color: #1e1b4b;">New Ticket Assigned</h2>
            <p style="color: #374151; line-height: 1.6;">
                <strong>${clientName}</strong> created a new ticket for you on <strong>Ticketly</strong>.
            </p>
            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin: 16px 0;">
                <p style="margin: 0 0 8px; font-weight: 600; color: #111827;">${ticketTitle}</p>
                <span style="display: inline-block; background: ${priorityColor}20; color: ${priorityColor}; padding: 2px 10px; border-radius: 6px; font-size: 12px; font-weight: 600;">
                    ${priority}
                </span>
            </div>
            <a
                href="${process.env.ORIGIN || "http://localhost:5173"}/dashboard/freelancer"
                style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 8px;"
            >
                View Ticket
            </a>
        </div>
    `;

    // Use Ethereal (fake) when RESEND_API_KEY missing or USE_FAKE_EMAIL=true
    if (!resend || USE_FAKE_EMAIL === "true") {
        return sendViaEthereal({ to, subject, html });
    }

    try {
        const resp = await resend.emails.send({
            from: FROM_ADDRESS,
            to,
            subject,
            html,
        });

        if (resp?.error) {
            throw new Error(resp.error.message || JSON.stringify(resp.error));
        }

        return resp;
    } catch (err) {
        console.error("sendTicketNotificationEmail error:", err);
        throw err;
    }
}

/**
 * Send an invite email to a client.
 * @param {{ to: string, freelancerName: string, companyName?: string }} options
 */
export async function sendInviteEmail({ to, freelancerName, companyName, inviteId }) {
    const subject = `${freelancerName} invited you to collaborate on Ticketly`;

    const origin = ORIGIN || process.env.ORIGIN || "http://localhost:5173";
    const acceptUrl = inviteId ? `${origin}/register?invite=${inviteId}` : `${origin}/register`;

    const html = `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
            <h2 style="color: #1e1b4b;">You've been invited to Ticketly</h2>
            <p style="color: #374151; line-height: 1.6;">
                <strong>${freelancerName}</strong>${companyName ? ` from ${companyName}` : ""}
                has invited you to collaborate on <strong>Ticketly</strong>.
            </p>
            <p style="color: #374151; line-height: 1.6;">
                Sign up or log in to accept the invite and start working together.
            </p>
            <a
                href="${acceptUrl}"
                style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px;"
            >
                Get Started
            </a>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 32px;">
                If you already have an account, just log in &mdash; the invite will be waiting for you.
            </p>
        </div>
    `;

    // Use Ethereal (fake) when RESEND_API_KEY missing or USE_FAKE_EMAIL=true
    if (!resend || USE_FAKE_EMAIL === "true") {
        return sendViaEthereal({ to, subject, html });
    }

    try {
        const resp = await resend.emails.send({
            from: FROM_ADDRESS,
            to,
            subject,
            html,
        });

        if (resp?.error) {
            // Normalize Resend validation errors into thrown errors with helpful guidance
            const msg = resp.error.message || JSON.stringify(resp.error);
            const guidance = msg.includes("verify a domain")
                ? `${msg} — verify a sending domain at https://resend.com/domains and set RESEND_FROM to an email on that domain, or use your account's verified from address.`
                : msg;
            throw new Error(guidance);
        }

        return resp;
    } catch (err) {
        console.error("sendInviteEmail error:", err);
        throw err;
    }
}
