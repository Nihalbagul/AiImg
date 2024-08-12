// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvucJRpOyBK10olxyhfwWTdqtA84KX7KA",
  authDomain: "auth-ecf8a.firebaseapp.com",
  projectId: "auth-ecf8a",
  storageBucket: "auth-ecf8a.appspot.com",
  messagingSenderId: "613674723622",
  appId: "1:613674723622:web:4193c62892a26a1df679e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);