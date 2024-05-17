import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBmodBJKfsculZRntClnkDoisRhweXs8G8",
  authDomain: "midtermflutter-9c698.firebaseapp.com",
  projectId: "midtermflutter-9c698",
  storageBucket: "midtermflutter-9c698.appspot.com",
  messagingSenderId: "520367706279",
  appId: "1:520367706279:web:fa4bbd0fa21290f17d0b82"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { app, auth, db };