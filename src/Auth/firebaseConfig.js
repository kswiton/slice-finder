import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0QRl7oHq9QwHnv3Yy5Oy7Zb8JhnK6024",
  authDomain: "pizza-project-26d36.firebaseapp.com",
  projectId: "pizza-project-26d36",
  storageBucket: "pizza-project-26d36.appspot.com",
  messagingSenderId: "918653672937",
  appId: "1:918653672937:web:1880dc9157269cda14ff78",
  measurementId: "G-P8XYDW1828",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
