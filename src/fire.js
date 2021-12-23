import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite/";

const firebaseConfig = {
    apiKey: "AIzaSyCItGJV2znqKk2K8Q3NBBZEjoK9pF_WMjE",
    authDomain: "parallel-70089.firebaseapp.com",
    projectId: "parallel-70089",
    storageBucket: "parallel-70089.appspot.com",
    messagingSenderId: "302629901204",
    appId: "1:302629901204:web:50af08c919725403d63581",
};

const fireApp = initializeApp(firebaseConfig);
const fireAuth = getAuth(fireApp);
const fireDB = getFirestore(fireApp);

export { fireApp, fireAuth, fireDB };
