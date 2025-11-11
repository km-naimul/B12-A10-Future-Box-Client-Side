// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDH-Y5crTULTFljUw2nJEFWC7IDeWaXJM",
  authDomain: "b12-a10-future-box-ded4b.firebaseapp.com",
  projectId: "b12-a10-future-box-ded4b",
  storageBucket: "b12-a10-future-box-ded4b.firebasestorage.app",
  messagingSenderId: "310311282193",
  appId: "1:310311282193:web:5fa38291250df77ca933b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);