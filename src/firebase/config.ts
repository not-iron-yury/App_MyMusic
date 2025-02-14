import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'not-auth.firebaseapp.com',
  projectId: 'not-auth',
  storageBucket: 'not-auth.firebasestorage.app',
  messagingSenderId: '150070674668',
  appId: '1:150070674668:web:0c71d5645f0516fff611c9',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
