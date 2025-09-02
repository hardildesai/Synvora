// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your project's Firebase configuration
const firebaseConfig = {
  "projectId": "rhythmpass",
  "appId": "1:838786524087:web:31ccdce567d221e82afe32",
  "storageBucket": "rhythmpass.firebasestorage.app",
  "apiKey": "AIzaSyBHCbLT7vzyXu3jJdSVY8JzdvChDJeEZS8",
  "authDomain": "rhythmpass.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "838786524087"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export const db = getFirestore(app);
