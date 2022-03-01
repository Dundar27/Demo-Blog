//import firebase from 'firebase/compat/app';
import { getFirestore } from '@firebase/firestore';
import { initializeApp } from "firebase/app";


const firebaseConfig ={
  apiKey: "AIzaSyBVMdw0oDL8XJREpHZp6TITmrlRMikLJ_c",
  authDomain: "fir-school-page.firebaseapp.com",
  projectId: "fir-school-page",
  storageBucket: "fir-school-page.appspot.com",
  messagingSenderId: "59211089125",
  appId: "1:59211089125:web:94bd095b04af729789c00c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;