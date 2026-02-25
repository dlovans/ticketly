import {
    collection,
    doc,
    addDoc,
    updateDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./client.js";

const ticketsRef = collection(db, "tickets");

/**
 * Create a new ticket (client action).
 * The `client` and `freelancer` fields are denormalized display names
 * used by TicketCard for search and display.
 */
export async function createTicket(data) {
    return addDoc(ticketsRef, {
        title: data.title,
        description: data.description || "",
        priority: data.priority || "Low",
        status: "Open",
        clientId: data.clientId,
        client: data.client || "",
        freelancerId: data.freelancerId,
        freelancer: data.freelancer || "",
        statusMessage: "",
        resolvedDate: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
}

/**
 * Update ticket status (freelancer action).
 * Automatically sets/clears resolvedDate based on status.
 */
export async function updateTicketStatus(ticketId, status, statusMessage = "") {
    const ref = doc(db, "tickets", ticketId);
    const update = {
        status,
        statusMessage,
        updatedAt: serverTimestamp(),
    };

    if (["Resolved", "Closed"].includes(status)) {
        update.resolvedDate = serverTimestamp();
    } else {
        update.resolvedDate = null;
    }

    return updateDoc(ref, update);
}

/**
 * Format a Firestore timestamp to a date string for the UI.
 */
function formatDate(timestamp) {
    if (!timestamp) return "";
    const d = timestamp.toDate();
    return d.toISOString().split("T")[0];
}

/**
 * Listen to all tickets assigned to a freelancer in real-time.
 * Returns data shaped for the ticket list UI.
 * @returns {Function} Unsubscribe function
 */
export function listenToFreelancerTickets(freelancerUid, callback) {
    const q = query(
        ticketsRef,
        where("freelancerId", "==", freelancerUid),
        orderBy("createdAt", "desc"),
    );

    return onSnapshot(q, (snapshot) => {
        const tickets = snapshot.docs.map((d) => {
            const data = d.data();
            return {
                id: d.id,
                ...data,
                date: formatDate(data.createdAt),
                resolvedDate: data.resolvedDate
                    ? data.resolvedDate.toDate().toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                      })
                    : null,
            };
        });
        callback(tickets);
    });
}

/**
 * Listen to all tickets created by a client in real-time.
 * Returns data shaped for the ticket list UI.
 * @returns {Function} Unsubscribe function
 */
export function listenToClientTickets(clientUid, callback) {
    const q = query(
        ticketsRef,
        where("clientId", "==", clientUid),
        orderBy("createdAt", "desc"),
    );

    return onSnapshot(q, (snapshot) => {
        const tickets = snapshot.docs.map((d) => {
            const data = d.data();
            return {
                id: d.id,
                ...data,
                date: formatDate(data.createdAt),
                resolvedDate: data.resolvedDate
                    ? data.resolvedDate.toDate().toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                      })
                    : null,
            };
        });
        callback(tickets);
    });
}

/**
 * Listen to a single ticket in real-time (used in the detail modal).
 * @returns {Function} Unsubscribe function
 */
export function listenToTicket(ticketId, callback) {
    const ref = doc(db, "tickets", ticketId);

    return onSnapshot(ref, (snap) => {
        if (snap.exists()) {
            const data = snap.data();
            callback({
                id: snap.id,
                ...data,
                date: formatDate(data.createdAt),
                resolvedDate: data.resolvedDate
                    ? data.resolvedDate.toDate().toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                      })
                    : null,
            });
        } else {
            callback(null);
        }
    });
}
