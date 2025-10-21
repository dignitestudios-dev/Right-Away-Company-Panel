import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "right-away-e9a12.firebaseapp.com",
  projectId: "right-away-e9a12",
  storageBucket: "right-away-e9a12.firebasestorage.app",
  messagingSenderId: "513472194421",
  appId: "1:513472194421:web:64556f0826f2e22e86153c",
  measurementId: "G-M1M13CPWT5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

const messaging = getMessaging(app);

export { messaging };

export default app;
