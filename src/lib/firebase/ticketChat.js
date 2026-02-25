import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./client.js";

/**
 * Send a message in a ticket's chat.
 * Messages are stored as a subcollection under the ticket document.
 * Rejects if the ticket is closed (chat is disabled on closed tickets).
 */
export async function sendTicketMessage(ticketId, senderUid, senderName, text, ticketStatus) {
    if (ticketStatus === "Closed") {
        throw new Error("Chat is disabled on closed tickets.");
    }

    const messagesRef = collection(db, "tickets", ticketId, "messages");

    return addDoc(messagesRef, {
        text,
        senderId: senderUid,
        senderName,
        createdAt: serverTimestamp(),
    });
}

/**
 * Listen to a ticket's chat messages in real-time.
 * Returns messages sorted oldest-first, shaped for ChatInterface:
 *   { id, text, sender, timestamp, isMe }
 * @param {string} ticketId
 * @param {string} currentUid - The logged-in user's uid, used to set `isMe`
 * @param {Function} callback - Receives the messages array
 * @returns {Function} Unsubscribe function
 */
export function listenToTicketMessages(ticketId, currentUid, callback) {
    const messagesRef = collection(db, "tickets", ticketId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((d) => {
            const data = d.data();
            const created = data.createdAt?.toDate();
            return {
                id: d.id,
                text: data.text,
                sender: data.senderName,
                isMe: data.senderId === currentUid,
                timestamp: created
                    ? created.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                      })
                    : "",
            };
        });
        callback(messages);
    });
}
