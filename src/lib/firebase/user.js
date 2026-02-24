import { doc, getDoc } from "firebase/firestore";
import { db } from "./client.js";

export async function getUserProfile(uid) {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        return userSnap.data();
    }
    return null;
}
