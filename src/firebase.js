import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDZG2QvVcZ6LnXc6EAXkRyv_tu3bWrBre8",
  authDomain: "live-comments-37d60.firebaseapp.com",
  projectId: "live-comments-37d60",
  storageBucket: "live-comments-37d60.appspot.com",
  messagingSenderId: "614673446162",
  appId: "1:614673446162:web:1809547afabd9849126fcb"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const serverTimestamp = () =>
  firebase.firestore.FieldValue.serverTimestamp();
export const COLLECTION = {
  POST: "posts"
};
