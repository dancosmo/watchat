import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBkep5nZFqS_VDIl9sow8fYu1gG9D-6PpQ",
  authDomain: "watchat-a226d.firebaseapp.com",
  projectId: "watchat-a226d",
  databaseURL: "http://watchat-a226d.firebaseio.com",
  storageBucket: "watchat-a226d.appspot.com",
  messagingSenderId: "783730964130",
  appId: "1:783730964130:web:c899d0066711c2f16689fb",
  measurementId: "G-0JWLWG0XX9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

