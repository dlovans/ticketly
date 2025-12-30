import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./client.js";

/**
 * Create a user document in Firestore
 * @param {import("firebase/auth").User} user
 * @param {string} [displayName]
 */
async function createUserDocument(user, displayName) {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    // Only create if document doesn't exist
    if (!userSnap.exists()) {
        await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: displayName || user.displayName || "",
            photoURL: user.photoURL || "",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    }
}

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import("firebase/auth").UserCredential>}
 */
export async function loginWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Sign up with email and password
 * @param {string} email
 * @param {string} password
 * @param {string} [displayName]
 * @returns {Promise<import("firebase/auth").UserCredential>}
 */
export async function signupWithEmail(email, password, displayName) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await createUserDocument(credential.user, displayName);
    return credential;
}

/**
 * Google authentication - handles both login and signup
 * If user doesn't exist, Firebase automatically creates a new account
 * @returns {Promise<import("firebase/auth").UserCredential>}
 */
export async function googleAuth() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    await createUserDocument(credential.user);
    return credential;
}

/**
 * Logout the current user
 * @returns {Promise<void>}
 */
export async function logout() {
    return signOut(auth);
}

/**
 * Send password reset email
 * @param {string} email
 * @returns {Promise<void>}
 */
export async function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
}
