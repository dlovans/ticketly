import {
    collection,
    doc,
    updateDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./client.js";

const relationshipsRef = collection(db, "relationships");

/**
 * Update a relationship's client-facing fields.
 */
export async function updateRelationship(relationshipId, data) {
    const ref = doc(db, "relationships", relationshipId);
    return updateDoc(ref, {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

/**
 * Soft-remove a relationship (sets status to "removed").
 */
export async function removeRelationship(relationshipId) {
    const ref = doc(db, "relationships", relationshipId);
    return updateDoc(ref, {
        status: "removed",
        updatedAt: serverTimestamp(),
    });
}

/**
 * Listen to a freelancer's client list in real-time.
 * Returns data shaped for the client management UI:
 *   { id, email, name, companyName, productName, website }
 * @returns {Function} Unsubscribe function
 */
export function listenToClients(freelancerUid, callback) {
    const q = query(
        relationshipsRef,
        where("freelancerId", "==", freelancerUid),
        where("status", "==", "active"),
    );

    return onSnapshot(q, (snapshot) => {
        const clients = snapshot.docs
            .map((d) => ({
                id: d.id,
                email: d.data().clientEmail,
                name: d.data().clientName,
                companyName: d.data().companyName,
                productName: d.data().productName,
                website: d.data().website,
                _createdAt: d.data().createdAt?.seconds || 0,
            }))
            .sort((a, b) => b._createdAt - a._createdAt);
        callback(clients);
    }, (error) => {
        console.error("listenToClients error:", error);
    });
}

/**
 * Listen to a client's freelancer list in real-time.
 * Returns data shaped for the freelancer list UI:
 *   { id, name, email, productName, joinedDate }
 * @returns {Function} Unsubscribe function
 */
export function listenToFreelancers(clientEmail, callback) {
    const q = query(
        relationshipsRef,
        where("clientEmail", "==", clientEmail),
        where("status", "==", "active"),
    );

    return onSnapshot(q, (snapshot) => {
        const freelancers = snapshot.docs
            .map((d) => {
                const data = d.data();
                const created = data.createdAt?.toDate();
                return {
                    id: d.id,
                    uid: data.freelancerId,
                    name: data.freelancerName,
                    email: data.freelancerEmail,
                    productName: data.productName,
                    joinedDate: created
                        ? created.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                          })
                        : "",
                    _createdAt: data.createdAt?.seconds || 0,
                };
            })
            .sort((a, b) => b._createdAt - a._createdAt);
        callback(freelancers);
    }, (error) => {
        console.error("listenToFreelancers error:", error);
    });
}
