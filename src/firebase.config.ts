import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCkEIkAf6vpWZJbRCwpOvmyQF_3hU7nk1U",
  authDomain: "geraldestate-b3e7b.firebaseapp.com",
  projectId: "geraldestate-b3e7b",
  storageBucket: "geraldestate-b3e7b.appspot.com",
  messagingSenderId: "350316261235",
  appId: "1:350316261235:web:170249d0e02327c0079f06",
  measurementId: "G-HKDE2ZWGT1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
