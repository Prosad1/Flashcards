// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqDLQVkIawN4MSa3zYkj6dy48KINk50RE",
  authDomain: "pantry-tracker-3947a.firebaseapp.com",
  projectId: "pantry-tracker-3947a",
  storageBucket: "pantry-tracker-3947a.appspot.com",
  messagingSenderId: "852930640158",
  appId: "1:852930640158:web:d24700a51a72c803a1710f",
  measurementId: "G-N7XLXVDNWL"
};

// Initialize Firebase
let firestore;

if (typeof window !== 'undefined' && !getApps().length) {
  const app = initializeApp(firebaseConfig);
  firestore = getFirestore(app);
}

export {firestore};