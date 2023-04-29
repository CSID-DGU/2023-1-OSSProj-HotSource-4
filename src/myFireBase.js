import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAGYKEVxH2AMO0MOQIS9vnjp5WgNZY4fPE",
    authDomain: "reactchat-2d807.firebaseapp.com",
    projectId: "reactchat-2d807",
    storageBucket: "reactchat-2d807.appspot.com",
    messagingSenderId: "894501345757",
    appId: "1:894501345757:web:8beeccaf4b05de7f6cfe34",
    measurementId: "G-BR98VV2VTL"
  };

  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
