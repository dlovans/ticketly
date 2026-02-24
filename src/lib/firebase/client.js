import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAH_pMarFbekIE36pWUEk4UHLZhA6tYzGw",
    authDomain: "ticketly-37056.firebaseapp.com",
    projectId: "ticketly-37056",
    storageBucket: "ticketly-37056.firebasestorage.app",
    messagingSenderId: "642236973406",
    appId: "1:642236973406:web:87740686e9af916e174fcf",
    measurementId: "G-29PP4QZPNT"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export { onAuthStateChanged };
export default app;
