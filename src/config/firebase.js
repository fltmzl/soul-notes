// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4lB_ORESZWhA0Z2deRYXoCJ2pRQaaULc",
  authDomain: "notes-app-123.firebaseapp.com",
  projectId: "notes-app-123",
  storageBucket: "notes-app-123.appspot.com",
  messagingSenderId: "7358463839",
  appId: "1:7358463839:web:3990cf928f91eb76c800ea",
  measurementId: "G-X646ZJ2QMZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
