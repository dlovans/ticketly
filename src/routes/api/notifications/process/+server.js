import { json } from "@sveltejs/kit";
import { db } from "$lib/firebase/client.js";
import { sendTicketNotificationEmail } from "$lib/server/email.js";
import { collection, query, where, getDocs, updateDoc, serverTimestamp } from "firebase/firestore";

/**
 * Process due scheduled notifications.
 * This endpoint will find notifications with sent === false and scheduledAt <= now
 * and send them via Resend. It marks them as sent on success.
 */
export async function POST() {
    try {
        const now = new Date();
        const q = query(
            collection(db, "notifications"),
            where("sent", "==", false),
            where("scheduledAt", "<", now),
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
                console.error("Failed to send scheduled notification", docSnap.id, err);
                results.push({ id: docSnap.id, sent: false, error: String(err) });
            }
        }

        return json({ success: true, processed: results.length, details: results });
    } catch (err) {
        console.error("/api/notifications/process error:", err);
        return json({ error: err.message || String(err) }, { status: 500 });
    }
}
