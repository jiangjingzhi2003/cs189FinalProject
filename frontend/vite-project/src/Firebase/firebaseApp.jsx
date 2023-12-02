// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASGmtvRuZaMA9ja_GZ4oLNyN5xbsUZ4wg",
  authDomain: "full-stack-decal-final-project.firebaseapp.com",
  projectId: "full-stack-decal-final-project",
  storageBucket: "full-stack-decal-final-project.appspot.com",
  messagingSenderId: "105682608537",
  appId: "1:105682608537:web:9f6c21b6e8448485bf3308",
  measurementId: "G-PHB87VXT3L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//initialize Firestore database
const db = getFirestore(app);
//initialize firebase authentication and get reference to the service
const auth = getAuth(app);
export {auth, db}

