// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8LSqnY_f8i8f7WPB1mJ3EK52DCW5Ksqc",
  authDomain: "truegate-live.firebaseapp.com",
  projectId: "truegate-live",
  storageBucket: "truegate-live.firebasestorage.app",
  messagingSenderId: "784324817474",
  appId: "1:784324817474:web:87c75cafaa5863dd3ff3db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Get Auth instance
export const auth = getAuth();
export const db = getFirestore(app);