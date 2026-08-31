import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA24axXX9gwAg3GRy2mfLO91R2byHtcnE0",
  authDomain: "pucpr-as2-web.firebaseapp.com",
  projectId: "pucpr-as2-web",
  storageBucket: "pucpr-as2-web.firebasestorage.app",
  messagingSenderId: "363261584146",
  appId: "1:363261584146:web:44a7d4502f0c2a795509cb",
  measurementId: "G-21PLT6BX83",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };

