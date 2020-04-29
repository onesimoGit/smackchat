import * as firebase from "firebase/app";

import "firebase/auth"
import "firebase/database"

var firebaseConfig = {
  apiKey: "AIzaSyDQMTq-VNDRJUT6yVdUsyrMNn5RtLSWbuY",
  authDomain: "onesimometro.firebaseapp.com",
  databaseURL: "https://onesimometro.firebaseio.com",
  projectId: "onesimometro",
  storageBucket: "onesimometro.appspot.com",
  messagingSenderId: "1018786425666",
  appId: "1:1018786425666:web:4ad840948e352ea074f6db"
};

// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }