import { Resend } from "resend";
import { RESEND_API_KEY } from "$env/static/private";

const resend = new Resend(RESEND_API_KEY);

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

    return resend.emails.send({
        from: "Ticketly <onboarding@resend.dev>",
        to,
        subject,
        html,
    });
}

/**
 * Send an invite email to a client.
 * @param {{ to: string, freelancerName: string, companyName?: string }} options
 */
export async function sendInviteEmail({ to, freelancerName, companyName }) {
    const subject = `${freelancerName} invited you to collaborate on Ticketly`;

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
                href="${process.env.ORIGIN || "http://localhost:5173"}/register"
                style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px;"
            >
                Get Started
            </a>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 32px;">
                If you already have an account, just log in &mdash; the invite will be waiting for you.
            </p>
        </div>
    `;

    return resend.emails.send({
        from: "Ticketly <onboarding@resend.dev>",
        to,
        subject,
        html,
    });
}
