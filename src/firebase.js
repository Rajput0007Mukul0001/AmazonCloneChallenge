// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// import firebase from "firebase/compat/app";
// /compat krek likhna padega kiyunki firebase ke updated version me ye hi chlta hai purani command deprraciate ho gyi hai isme 

import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBqCO1jc8AS-EMwcNX7KLznCgOiekiDRCQ",
  authDomain: "fir-clone-project-ef81e.firebaseapp.com",
  projectId: "fir-clone-project-ef81e",
  storageBucket: "fir-clone-project-ef81e.appspot.com",
  messagingSenderId: "1025544753901",
  appId: "1:1025544753901:web:4aa67d98c5e1eb9b62f2e4",
  measurementId: "G-3F2H70411S"
};

// intialization of the app here 
const firebaseApp = firebase.initializeApp(firebaseConfig);

// second step is intialize the database here
const db = firebase.firestore();
const auth = firebase.auth();

export  {db,auth};