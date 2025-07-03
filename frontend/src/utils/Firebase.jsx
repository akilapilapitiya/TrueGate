// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB10I1AR_mnj49hOzyCoaCiM-delQOMFfU",
  authDomain: "truegatev2.firebaseapp.com",
  projectId: "truegatev2",
  storageBucket: "truegatev2.firebasestorage.app",
  messagingSenderId: "1002302599033",
  appId: "1:1002302599033:web:0077f70ea12e89d4e189a8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Get Auth instance
export const auth = getAuth();
export const db = getFirestore(app);
