// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBydiKcJqNm1yky2lLOtsonpYLp8hBGYoA",
  authDomain: "vodth-dapp.firebaseapp.com",
  databaseURL:
    "https://vodth-dapp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vodth-dapp",
  storageBucket: "vodth-dapp.appspot.com",
  messagingSenderId: "902325669003",
  appId: "1:902325669003:web:69a6114ed272713ce6588e",
  measurementId: "G-NENL551MPG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
