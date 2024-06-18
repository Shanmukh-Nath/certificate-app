// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8-KnFktwWp9Uo2AE7pI8-NZ28dpwlVsU",
  authDomain: "certificate-app-cb656.firebaseapp.com",
  projectId: "certificate-app-cb656",
  storageBucket: "certificate-app-cb656.appspot.com",
  messagingSenderId: "775200333564",
  appId: "1:775200333564:web:8602b2008e661bc641c179"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export {db, auth, googleProvider};