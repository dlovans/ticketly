import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./client.js";

export async function getUserProfile(uid) {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        return userSnap.data();
    }
    return null;
}

export async function updateUserProfile(uid, data) {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp(),
    });
}
