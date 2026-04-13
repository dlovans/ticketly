import { json } from "@sveltejs/kit";
import { sendInviteEmail } from "$lib/server/email.js";

export async function POST({ request }) {
    const { to, freelancerName, companyName, inviteId } = await request.json();

    if (!to || !freelancerName || !inviteId) {
        return json({ error: "Missing required fields: to, freelancerName, inviteId" }, { status: 400 });
    }

    try {
        // sendInviteEmail returns the Resend/Ethereal response object (or throws).
        const resp = await sendInviteEmail({ to, freelancerName, companyName, inviteId });
        // If Ethereal was used, resp.data.previewUrl may exist; otherwise return email id
        return json({ success: true, emailId: resp?.id || resp?.data?.id || null, previewUrl: resp?.data?.previewUrl || null });
    } catch (err) {
        console.error("/api/invites/send-email error:", err);
        return json({ error: err?.message || String(err) }, { status: 500 });
    }
}
