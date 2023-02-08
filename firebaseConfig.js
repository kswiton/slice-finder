// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0QRl7oHq9QwHnv3Yy5Oy7Zb8JhnK6024",
  authDomain: "pizza-project-26d36.firebaseapp.com",
  projectId: "pizza-project-26d36",
  storageBucket: "pizza-project-26d36.appspot.com",
  messagingSenderId: "918653672937",
  appId: "1:918653672937:web:1880dc9157269cda14ff78",
  measurementId: "G-P8XYDW1828",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
