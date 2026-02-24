import { json } from "@sveltejs/kit";
import { sendTicketNotificationEmail } from "$lib/server/email.js";

export async function POST({ request }) {
    const { to, clientName, ticketTitle, priority } = await request.json();

    if (!to || !clientName || !ticketTitle) {
        return json({ error: "Missing required fields: to, clientName, ticketTitle" }, { status: 400 });
    }

    const { data, error } = await sendTicketNotificationEmail({ to, clientName, ticketTitle, priority });

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ success: true, emailId: data?.id });
}
