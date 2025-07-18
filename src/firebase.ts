// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5cCeEKtl8EJ_eg81xaAQvFmKtKHtG-yA",
  authDomain: "task-memo-61f32.firebaseapp.com",
  projectId: "task-memo-61f32",
  storageBucket: "task-memo-61f32.firebasestorage.app",
  messagingSenderId: "649598502769",
  appId: "1:649598502769:web:ee26565ed63bf46bfa58d0",
  measurementId: "G-W007GS515Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {analytics, auth};