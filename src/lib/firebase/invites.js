import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDoc,
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
    // return the DocumentReference so callers can get the id
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
 * Fetch a pending invite document by id.
 * Returns { id, ...data } or null if not found.
 */
export async function fetchInviteById(inviteId) {
    const ref = doc(invitesRef, inviteId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
}

/**
 * Accept an invite by id. Fetches the invite and calls acceptInvite.
 */
export async function acceptInviteById(inviteId, clientUid) {
    const invite = await fetchInviteById(inviteId);
    if (!invite) throw new Error("Invite not found");
    return acceptInvite(invite, clientUid);
}

/**
 * Accept an invite (client action).
 * Atomically marks the invite as accepted and creates a relationship.
 */
export async function acceptInvite(invite, clientUid) {
    const batch = writeBatch(db);

    // 1. Update invite status
    const inviteRef = doc(db, "pendingInvites", invite.id);
    batch.update(inviteRef, {
        status: "accepted",
        updatedAt: serverTimestamp(),
    });

    // 2. Create the relationship
    const relationshipRef = doc(collection(db, "relationships"));
    const relationship = {
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
    };

    if (clientUid) {
        relationship.clientUid = clientUid;
    }

    batch.set(relationshipRef, relationship);

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
 * Cancel/remove a pending invite (freelancer action).
 */
export async function cancelInvite(inviteId) {
    const ref = doc(db, "pendingInvites", inviteId);
    return deleteDoc(ref);
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
    );

    return onSnapshot(q, (snapshot) => {
        const invites = snapshot.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        callback(invites);
    }, (error) => {
        console.error("listenToIncomingInvites error:", error);
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
    );

    return onSnapshot(q, (snapshot) => {
        const invites = snapshot.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        callback(invites);
    }, (error) => {
        console.error("listenToOutgoingInvites error:", error);
    });
}
