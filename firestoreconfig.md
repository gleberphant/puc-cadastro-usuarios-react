// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA24axXX9gwAg3GRy2mfLO91R2byHtcnE0",
  authDomain: "pucpr-as2-web.firebaseapp.com",
  projectId: "pucpr-as2-web",
  storageBucket: "pucpr-as2-web.firebasestorage.app",
  messagingSenderId: "363261584146",
  appId: "1:363261584146:web:44a7d4502f0c2a795509cb",
  measurementId: "G-21PLT6BX83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);