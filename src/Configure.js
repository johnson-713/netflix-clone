
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';




const firebaseConfig = {
    apiKey: "AIzaSyDCWlJNZdvyatSLs-zM_k-EBHJPhL72Pg4",
    authDomain: "netflix-clone-be183.firebaseapp.com",
    projectId: "netflix-clone-be183",
    storageBucket: "netflix-clone-be183.appspot.com",
    messagingSenderId: "1011915335943",
    appId: "1:1011915335943:web:3c5012f598824ce1fabda2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.initializeApp(firebaseConfig).firestore();
// const auth = firebase.auth();

export default firebase;

// export default db;
export { db };