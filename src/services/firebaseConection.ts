import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCknHlgpiDmt97r2Jbe5jL-mzbOpWOtthM",
  authDomain: "webcarrros.firebaseapp.com",
  projectId: "webcarrros",
  storageBucket: "webcarrros.appspot.com",
  messagingSenderId: "297192788705",
  appId: "1:297192788705:web:a46b029b47364729b81da0",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
