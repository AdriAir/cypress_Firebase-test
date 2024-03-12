import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import {
    CollectionReference,
    collection,
    getFirestore,
    onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDIX7l_UdUBoLrVQFgO3BkSyI9VOu-9h6g",
    authDomain: "vite-project-8730a.firebaseapp.com",
    projectId: "vite-project-8730a",
    storageBucket: "vite-project-8730a.appspot.com",
    messagingSenderId: "402283216136",
    appId: "1:402283216136:web:dacc4665727c388eed80bd",
    measurementId: "G-XFMPD3T1N9",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const button = document.getElementById("login")!;

button.addEventListener("click", (_) => {
    signInWithRedirect(auth, new GoogleAuthProvider());
});

onAuthStateChanged(auth, (user) => {
    if (user == null) {
        return;
    }
    console.log(user);

    //FIREBASE
    createStream(animals);
    createStream(vaccines);
});

const db = getFirestore();

const animals = collection(db, "animals");
const vaccines = collection(db, "vaccines");

function createStream(ref: CollectionReference) {
    
    //Esto se ejecuta cada vez que cambia la BD de la referencia
    return onSnapshot(ref, (snapshot) => {
        const items = snapshot.docs.map((item) => item.data());
        // const changes = snapshot.docChanges();

        for (const item of items) {
            console.log(item);
        }
    });
}
