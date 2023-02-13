import firebase from 'firebase/app';
import "firebase/auth"
import "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyAQoF4QIn2bjzsftRWlT8exxbhUvyszxnE",
    authDomain: "college-covid-system.firebaseapp.com",
    projectId: "college-covid-system",
    storageBucket: "college-covid-system.appspot.com",
    messagingSenderId: "498393572311",
    appId: "1:498393572311:web:c5d80fee47737a4cf92192",
    measurementId: "G-MBZGC6W19B"
};


let app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth()
export const firestore = firebase.firestore();
export default app;