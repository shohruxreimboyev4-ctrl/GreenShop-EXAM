import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwd2JydTbySdfty_p-e5I2jZuuBsbBDkU",
  authDomain: "greenshopn101.firebaseapp.com",
  projectId: "greenshopn101",
  storageBucket: "greenshopn101.firebasestorage.app",
  messagingSenderId: "68046348024",
  appId: "1:68046348024:web:131f8dd017cb96606ea50d",
  measurementId: "G-HCWQZHHX0Z",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};
