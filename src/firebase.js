import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAjk07qHdXvFs4cm0xiTuCq7B_pteCHMQQ",
    authDomain: "instagram-react-clone-build.firebaseapp.com",
    databaseURL: "https://instagram-react-clone-build.firebaseio.com",
    projectId: "instagram-react-clone-build",
    storageBucket: "instagram-react-clone-build.appspot.com",
    messagingSenderId: "434551334319",
    appId: "1:434551334319:web:20e7b51a7a7b36e29d7b5a",
    measurementId: "G-TV52XGF42F"
});

//grabbing three services from firebase
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};