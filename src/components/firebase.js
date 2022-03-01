import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import firebase from 'firebase/compat/app';

const firebaseConfig ={
    apiKey: "AIzaSyBVMdw0oDL8XJREpHZp6TITmr1RMikLJ_c",
    authDomain: "fir-school-page.firebaseapp.com",
    projectId: "fir-school-page",
    storageBucket: "fir-school-page.appspot.com",
    messagingSenderId: "59211089125",
    appId: "1:59211089125:web:d5ff265fc1699d8489c00c"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;