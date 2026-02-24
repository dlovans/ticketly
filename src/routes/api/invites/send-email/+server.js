import { json } from "@sveltejs/kit";
import { sendInviteEmail } from "$lib/server/email.js";

export async function POST({ request }) {
    const { to, freelancerName, companyName } = await request.json();

    if (!to || !freelancerName) {
        return json({ error: "Missing required fields: to, freelancerName" }, { status: 400 });
    }

    const { data, error } = await sendInviteEmail({ to, freelancerName, companyName });

    if (error) {
        return json({ error: error.message }, { status: 500 });
    }

    return json({ success: true, emailId: data?.id });
}
