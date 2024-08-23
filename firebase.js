// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirebase} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA91VRWgKuEJPQZ3zN8cNmcKJHoKVPwHus",
  authDomain: "flashcards-app-dc81a.firebaseapp.com",
  projectId: "flashcards-app-dc81a",
  storageBucket: "flashcards-app-dc81a.appspot.com",
  messagingSenderId: "475146476991",
  appId: "1:475146476991:web:ddfc6c7f1ac9c4e0bb550a",
  measurementId: "G-8DBK79NZ73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirebase(app)

export {db}