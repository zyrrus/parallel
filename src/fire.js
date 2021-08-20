import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCItGJV2znqKk2K8Q3NBBZEjoK9pF_WMjE",
    authDomain: "parallel-70089.firebaseapp.com",
    projectId: "parallel-70089",
    storageBucket: "parallel-70089.appspot.com",
    messagingSenderId: "302629901204",
    appId: "1:302629901204:web:50af08c919725403d63581"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;