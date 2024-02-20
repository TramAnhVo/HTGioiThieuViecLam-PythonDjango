// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDs-P5NUzMN3yRU-scgj6MJpjeYYi_mmi8",
  authDomain: "pushresume-bc00f.firebaseapp.com",
  projectId: "pushresume-bc00f",
  storageBucket: "pushresume-bc00f.appspot.com",
  messagingSenderId: "585927734547",
  appId: "1:585927734547:web:3a98e918bd58d840fad6e6",
  measurementId: "G-8GZDBXDV6N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);