// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAPi-PQnGhK_qYBY6MmfjPEK0h8XVKq8w",
    authDomain: "paymentsystem-d09e7.firebaseapp.com",
    projectId: "paymentsystem-d09e7",
    storageBucket: "paymentsystem-d09e7.appspot.com",
    messagingSenderId: "738363159815",
    appId: "1:738363159815:web:c77645a0e7267d995701a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
