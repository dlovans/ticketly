import { json } from "@sveltejs/kit";
import { db } from "$lib/firebase/client.js";
import { sendTicketNotificationEmail } from "$lib/server/email.js";
import { collection, addDoc, serverTimestamp, Timestamp, doc, getDoc } from "firebase/firestore";

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

        // If we have a freelancerId, try to read their notification settings
        let userDelays = null;
        if (freelancerId) {
            try {
                const userRef = doc(db, "users", freelancerId);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    const up = userSnap.data();
                    userDelays = up.notification_delays || null;
                }
            } catch (err) {
                console.warn("Could not read freelancer profile for notification delays:", err);
            }
        }

        // Resolve scheduling strategy based on user settings if present, otherwise fall back
        // to default rules: Emergency/High -> immediate, Medium -> 30min, Low -> on login
        const delayConfig = userDelays?.[priority];

        if (delayConfig?.type === "immediate" || (!delayConfig && (priority === "Emergency" || priority === "High"))) {
            const result = await sendTicketNotificationEmail({ to, clientName, ticketTitle, priority });
            return json({ success: true, immediate: true, data: result?.id || null });
        }

        if (delayConfig?.type === "delay" || (!delayConfig && priority === "Medium")) {
            const minutes = delayConfig?.minutes ?? 30;
            const scheduledAt = Timestamp.fromDate(new Date(Date.now() + minutes * 60 * 1000));
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

        // Default/explicit on-login
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
