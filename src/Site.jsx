import SignOut from "./SignOut";
import firebase from "firebase";

try{
    firebase.initializeApp({
        apiKey: "AIzaSyBehF7uI0nawaQhZAqy7p8ecRA63t1Hs9E",
        authDomain: "passion-dinette.firebaseapp.com",
        databaseURL: "https://passion-dinette.firebaseio.com",
        projectId: "passion-dinette",
        storageBucket: "passion-dinette.appspot.com",
        messagingSenderId: "703791377103",
        appId: "1:703791377103:web:db01d933bc617a024ce5ba",
        measurementId: "G-77BV24HK07"
    });
}catch(err){
    console.error('Firebase initialization error', err.stack)
}

function Site() {





    return (
        <div><SignOut /></div>
    );
}
export default Site;