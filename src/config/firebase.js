// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth }from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "customerapp-e7a8a.firebaseapp.com",
  projectId: "customerapp-e7a8a",
  storageBucket: "customerapp-e7a8a.appspot.com",
  messagingSenderId: "1050764884647",
  appId: "1:1050764884647:web:1f215c58a11f0f640af982",
  measurementId: "G-PHMC8MZ8SQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);