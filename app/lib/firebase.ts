import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0O0WdnMTtrcbaHoxPUqiYwpCnhw3SeVM",
  authDomain: "smartcart-ba5ec.firebaseapp.com",
  projectId: "smartcart-ba5ec",
  storageBucket: "smartcart-ba5ec.firebasestorage.app",
  messagingSenderId: "604874133309",
  appId: "1:604874133309:web:5b58a7b209a88a510fff54",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;