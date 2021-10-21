// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCItGJV2znqKk2K8Q3NBBZEjoK9pF_WMjE",
  authDomain: "parallel-70089.firebaseapp.com",
  projectId: "parallel-70089",
  storageBucket: "parallel-70089.appspot.com",
  messagingSenderId: "302629901204",
  appId: "1:302629901204:web:50af08c919725403d63581"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
export default fire;