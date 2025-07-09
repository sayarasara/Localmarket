// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACn-xR2dDJwMP_3j54xFrhSdw5EAVzPUU",
  authDomain: "local-market-357ca.firebaseapp.com",
  projectId: "local-market-357ca",
  storageBucket: "local-market-357ca.firebasestorage.app",
  messagingSenderId: "96367336794",
  appId: "1:96367336794:web:16d5695c863eec16486763"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);