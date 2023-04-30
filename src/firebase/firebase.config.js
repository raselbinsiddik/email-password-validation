// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCSiGdSiXMvHWpBt9FzaKgpDaUO8qA19z8",
    authDomain: "fir-auth1-c9818.firebaseapp.com",
    projectId: "fir-auth1-c9818",
    storageBucket: "fir-auth1-c9818.appspot.com",
    messagingSenderId: "534709932191",
    appId: "1:534709932191:web:4bbeaf35d35d60fee6d2aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;