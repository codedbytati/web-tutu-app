import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-WGgzwL8zxffmsxK_bKegDP3eyGT39so",
  authDomain: "tutu-app-f1a12.firebaseapp.com",
  projectId: "tutu-app-f1a12",
  storageBucket: "tutu-app-f1a12.firebasestorage.app",
  messagingSenderId: "855408455233",
  appId: "1:855408455233:web:5d0a3784e2b3b6acbba0c0",
  measurementId: "G-K798JN6795",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
