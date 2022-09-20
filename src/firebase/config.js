import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBIXOz6UOjF_DBsEeb1QnJ_8_gAfTza70A",
    authDomain: "project-manger-56f5b.firebaseapp.com",
    projectId: "project-manger-56f5b",
    storageBucket: "project-manger-56f5b.appspot.com",
    messagingSenderId: "406573254486",
    appId: "1:406573254486:web:4841edac96b60e75ffb8f7"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { db, auth, timestamp, storage }
