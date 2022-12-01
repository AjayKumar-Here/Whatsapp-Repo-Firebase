import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJdFb3f6RhozMqNCoW_E2F7esMu3Ndj1Q",
  authDomain: "whatsapp-fire-f0bee.firebaseapp.com",
  databaseURL: "whatsapp-firebase-f0bee-default-rtdb.firebaseio.com",
  projectId: "whatsapp-fire-f0bee",
  storageBucket: "whatsapp-fire-f0bee.appspot.com",
  messagingSenderId: "477114860560",
  appId: "1:477114860560:web:2072ee39e51bef011b3695"
};



// Initialize Firebase
const app=initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {auth , provider , app};
export default db;
