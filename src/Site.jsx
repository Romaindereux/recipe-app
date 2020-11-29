import firebase from "firebase";
import Ingredients from "./Ingredients/Ingredients";
import Recipes from "./Recipes/Recipes";
import Home from "./Home";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


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
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/ingredients">Ingredients</Link>
                        </li>
                        <li>
                            <Link to="/recipes">Recipes</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/ingredients">
                        <Ingredients />
                    </Route>
                    <Route path="/recipes">
                        <Recipes />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
export default Site;