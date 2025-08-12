import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "prepwise-45979.firebaseapp.com",
  projectId: "prepwise-45979",
  storageBucket: "prepwise-45979.firebasestorage.app",
  messagingSenderId: "892548603471",
  appId: "1:892548603471:web:73b52300fad521f732543a",
  measurementId: "G-P7HZDNJP2M"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);