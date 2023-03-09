import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDqVsq8kvEiCB3pc6lIcvr17xBZK7Hg-nM",
    authDomain: "myproject-8cb54.firebaseapp.com",
    projectId: "myproject-8cb54",
    storageBucket: "myproject-8cb54.appspot.com",
    messagingSenderId: "1001859799752",
    appId: "1:1001859799752:web:dd95bd854d47ed6d2a63fd",
    measurementId: "G-RBKE7P0RKY"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth }