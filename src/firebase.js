// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore, collection, getDocs} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjAZmCnGc1qfkagkcCO52D7w6CP3tSDSU",
  authDomain: "minichat-85485.firebaseapp.com",
  projectId: "minichat-85485",
  storageBucket: "minichat-85485.appspot.com",
  messagingSenderId: "559424787969",
  appId: "1:559424787969:web:e5fa00682a16fa35209200"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore(app);
