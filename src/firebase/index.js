// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//firebase auth imports
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXGBrr1LcUHVuaJPOQi0S0kMnsOVURQQA",
  authDomain: "endurance-bbc93.firebaseapp.com",
  projectId: "endurance-bbc93",
  storageBucket: "endurance-bbc93.appspot.com",
  messagingSenderId: "661799593854",
  appId: "1:661799593854:web:bab0a3ce7a7a4fa255752f",
  measurementId: "G-M6W8L77VSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//get user data to know the user logged 
const userAuth = getAuth(app);

export {
  db,
  userAuth
}