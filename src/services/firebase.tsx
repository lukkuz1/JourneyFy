import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAcN-kGs1M22h3qiCNByFqmqEBr_trftqE",
  authDomain: "journeyfy-a90b4.firebaseapp.com",
  databaseURL: "https://journeyfy-a90b4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "journeyfy-a90b4",
  storageBucket: "journeyfy-a90b4.appspot.com",
  messagingSenderId: "1075210035793",
  appId: "1:1075210035793:web:353fa19466ab353476ce70",
  measurementId: "G-3VKT0EZKKJ"
};

export const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const rtdb = getDatabase(app);


export default { auth, db, rtdb };