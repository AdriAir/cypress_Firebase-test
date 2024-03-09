import "/node_modules/@fortawesome/fontawesome-free/css/fontawesome.css";
import "/node_modules/@fortawesome/fontawesome-free/css/brands.css";
import "/node_modules/@fortawesome/fontawesome-free/css/solid.css";
import "./assets/styles/global.css";
import "./assets/styles/form.component.css";
import "./assets/styles/animals-cards.component.css";
import "./assets/styles/animals-table.component.css";

import { AppController } from "./app/controllers/";
import {
    AnimalService,
    AnimalStorageService,
    AnimalStoreService,
    HttpService,
    VaccineService,
    VaccineStorageService,
    VaccineStoreService,
} from "./app/services";
import { AnimalView, FormView } from "./app/views";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCf5ydPGP36EYzuYX5qTGJ2xQojeCMhUG4",
    authDomain: "adriair-animals.firebaseapp.com",
    projectId: "adriair-animals",
    storageBucket: "adriair-animals.appspot.com",
    messagingSenderId: "786430600850",
    appId: "1:786430600850:web:346bdb2994ec0c3b04284b",
    measurementId: "G-JRVYM6M83V",
};

const firebaseApp = initializeApp();
// const analytics = getAnalytics(firebaseApp);
// const auth = getAuth(firebaseApp);
// const db = getFirestore();

// export { auth };

const app = new AppController(
    new AnimalService(
        new HttpService(),
        new AnimalStorageService(),
        new AnimalStoreService()
    ),
    new VaccineService(
        new HttpService(),
        new VaccineStorageService(),
        new VaccineStoreService()
    ),
    new AnimalView(),
    new FormView()
);
