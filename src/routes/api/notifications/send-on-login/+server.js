import { json } from "@sveltejs/kit";
import { db } from "$lib/firebase/client.js";
import { sendTicketNotificationEmail } from "$lib/server/email.js";
import { collection, query, where, getDocs, updateDoc, serverTimestamp } from "firebase/firestore";

/**
 * Send notifications that were marked to be sent on next login for a given email.
 * Expects { email: string } in the POST body.
 */
export async function POST({ request }) {
    try {
        const { email } = await request.json();
        if (!email) return json({ error: "Missing required field: email" }, { status: 400 });

        const q = query(
            collection(db, "notifications"),
            where("sent", "==", false),
            where("sendOnLogin", "==", true),
            where("to", "==", email),
        );

        const snap = await getDocs(q);
        const results = [];

        for (const docSnap of snap.docs) {
            const data = docSnap.data();
            try {
                await sendTicketNotificationEmail({
                    to: data.to,
                    clientName: data.clientName,
                    ticketTitle: data.ticketTitle,
                    priority: data.priority,
                });

                await updateDoc(docSnap.ref, {
                    sent: true,
                    sentAt: serverTimestamp(),
                });

                results.push({ id: docSnap.id, sent: true });
            } catch (err) {
                console.error("Failed to send on-login notification", docSnap.id, err);
                results.push({ id: docSnap.id, sent: false, error: String(err) });
            }
        }

        return json({ success: true, processed: results.length, details: results });
    } catch (err) {
        console.error("/api/notifications/send-on-login error:", err);
        return json({ error: err.message || String(err) }, { status: 500 });
    }
}
