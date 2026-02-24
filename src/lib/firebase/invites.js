import {
    collection,
    doc,
    addDoc,
    updateDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    writeBatch,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./client.js";

const invitesRef = collection(db, "pendingInvites");

/**
 * Send an invite to a client (freelancer action).
 * The invite stays pending until the client accepts or declines.
 */
export async function sendInvite(freelancerUid, freelancerName, freelancerEmail, clientData) {
    return addDoc(invitesRef, {
        freelancerId: freelancerUid,
        freelancerName,
        freelancerEmail,
        clientEmail: clientData.email,
        clientName: clientData.name || "",
        companyName: clientData.companyName || "",
        productName: clientData.productName || "",
        website: clientData.website || "",
        status: "pending",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
}

/**
 * Accept an invite (client action).
 * Atomically marks the invite as accepted and creates a relationship.
 */
export async function acceptInvite(invite) {
    const batch = writeBatch(db);

    // 1. Update invite status
    const inviteRef = doc(db, "pendingInvites", invite.id);
    batch.update(inviteRef, {
        status: "accepted",
        updatedAt: serverTimestamp(),
    });

    // 2. Create the relationship
    const relationshipRef = doc(collection(db, "relationships"));
    batch.set(relationshipRef, {
        freelancerId: invite.freelancerId,
        freelancerName: invite.freelancerName,
        freelancerEmail: invite.freelancerEmail,
        clientEmail: invite.clientEmail,
        clientName: invite.clientName,
        companyName: invite.companyName,
        productName: invite.productName,
        website: invite.website,
        status: "active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return batch.commit();
}

/**
 * Decline an invite (client action).
 */
export async function declineInvite(inviteId) {
    const ref = doc(db, "pendingInvites", inviteId);
    return updateDoc(ref, {
        status: "declined",
        updatedAt: serverTimestamp(),
    });
}

/**
 * Listen to incoming invites for a client in real-time.
 * Only returns pending invites (not accepted/declined).
 * @returns {Function} Unsubscribe function
 */
export function listenToIncomingInvites(clientEmail, callback) {
    const q = query(
        invitesRef,
        where("clientEmail", "==", clientEmail),
        where("status", "==", "pending"),
        orderBy("createdAt", "desc"),
    );

    return onSnapshot(q, (snapshot) => {
        const invites = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
        }));
        callback(invites);
    });
}

/**
 * Listen to outgoing invites sent by a freelancer in real-time.
 * Returns all invites (pending, accepted, declined) so the freelancer
 * can see the status of each.
 * @returns {Function} Unsubscribe function
 */
export function listenToOutgoingInvites(freelancerUid, callback) {
    const q = query(
        invitesRef,
        where("freelancerId", "==", freelancerUid),
        orderBy("createdAt", "desc"),
    );

    return onSnapshot(q, (snapshot) => {
        const invites = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
        }));
        callback(invites);
    });
}
