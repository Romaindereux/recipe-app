import './App.css';
import LoginForm from "./Form/LoginForm";
import Site from "./Site";

import firebase from 'firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

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

const auth = firebase.auth();
export const firestore = firebase.firestore();
export const analytics = firebase.analytics();


function App() {

    const [user] = useAuthState(auth);

    return (
        <div className="App">
            {user ? <Site/> : <LoginForm/>}
        </div>
    );

}

export default App;
