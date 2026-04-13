import { json } from "@sveltejs/kit";
import { db } from "$lib/firebase/client.js";
import { sendTicketNotificationEmail } from "$lib/server/email.js";
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";

/**
 * Schedule or send a ticket notification based on priority.
 * - Emergency/High -> send immediately
 * - Medium -> schedule for now + 30 minutes
 * - Low -> schedule to send on next login (sendOnLogin: true)
 */
export async function POST({ request }) {
    try {
        const { to, clientName, ticketTitle, priority, freelancerId } = await request.json();

        if (!to || !clientName || !ticketTitle || !priority) {
            return json({ error: "Missing required fields: to, clientName, ticketTitle, priority" }, { status: 400 });
        }

        // Immediate send for high priority
        if (priority === "Emergency" || priority === "High") {
            const result = await sendTicketNotificationEmail({ to, clientName, ticketTitle, priority });
            return json({ success: true, immediate: true, data: result?.id || null });
        }

        // Medium -> schedule 30 minutes from now
        if (priority === "Medium") {
            const scheduledAt = Timestamp.fromDate(new Date(Date.now() + 30 * 60 * 1000));
            const docRef = await addDoc(collection(db, "notifications"), {
                to,
                clientName,
                ticketTitle,
                priority,
                freelancerId: freelancerId || null,
                scheduledAt,
                sendOnLogin: false,
                sent: false,
                createdAt: serverTimestamp(),
            });

            return json({ success: true, scheduled: true, id: docRef.id });
        }

        // Low -> send on next login
        const lowRef = await addDoc(collection(db, "notifications"), {
            to,
            clientName,
            ticketTitle,
            priority,
            freelancerId: freelancerId || null,
            scheduledAt: null,
            sendOnLogin: true,
            sent: false,
            createdAt: serverTimestamp(),
        });

        return json({ success: true, scheduledOnLogin: true, id: lowRef.id });
    } catch (err) {
        console.error("/api/notifications/schedule error:", err);
        return json({ error: err.message || String(err) }, { status: 500 });
    }
}
