import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBf8a5i8CEu1j589vRRnyHq-Q0cssUGBbY",
  authDomain: "end-project-32b55.firebaseapp.com",
  databaseURL: "https://end-project-32b55-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "end-project-32b55",
  storageBucket: "end-project-32b55.appspot.com",
  messagingSenderId: "525798068642",
  appId: "1:525798068642:web:95a8390c1e22ae80cd22fb",
  measurementId: "G-HXHYLF835P"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth;

export const ggProvider = new firebase.auth.GoogleAuthProvider();

export const COLLECTION = {
  POST: "posts"
};