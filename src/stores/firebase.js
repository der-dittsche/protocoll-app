import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0YM4CGU90TlWfC7hFa5R0bKQyO31p4JY",
  authDomain: "protocoll-app.firebaseapp.com",
  databaseURL: "https://protocoll-app-default-rtdb.firebaseio.com",
  projectId: "protocoll-app",
  storageBucket: "protocoll-app.appspot.com",
  messagingSenderId: "1020478139765",
  appId: "1:1020478139765:web:3eccc091a274095c3cf73c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
