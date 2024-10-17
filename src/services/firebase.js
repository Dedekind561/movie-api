// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHY9r0gT-RsrdvmRsuROKT7D3dnaKo3b8",
  authDomain: "movie-api-2b24d.firebaseapp.com",
  projectId: "movie-api-2b24d",
  storageBucket: "movie-api-2b24d.appspot.com",
  messagingSenderId: "405135931182",
  appId: "1:405135931182:web:d31f8183a6d3f85cb6acbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
