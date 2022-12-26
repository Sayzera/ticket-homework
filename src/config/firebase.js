// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC4mhc1Pnmuf6xFpgz_tUffe_a264jMRZY',
  authDomain: 'ticket-system-4ff1e.firebaseapp.com',
  projectId: 'ticket-system-4ff1e',
  storageBucket: 'ticket-system-4ff1e.appspot.com',
  messagingSenderId: '11079528288',
  appId: '1:11079528288:web:6b378589ed3af91d9bf805',
  measurementId: 'G-8EM7DR02T9',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
