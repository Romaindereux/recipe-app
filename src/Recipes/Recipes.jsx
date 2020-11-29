import firebase from "firebase/app";
import {useCollectionData} from "react-firebase-hooks/firestore";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Ingredients from "../Ingredients/Ingredients";
import RecipeFull from "./RecipeFull";
import {useState} from "react";
import Modal from "../General/Modal";
import NewIngredientForm from "../Ingredients/NewIngredientForm";
import NewRecipeForm from "./NewRecipeForm";

const firestore = firebase.firestore();

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


function Recipes(){

    const recipeRef = firestore.collection('recipes');
    const query = recipeRef.orderBy('name');
    const [recipes] = useCollectionData( query, { idField: 'id' });
    return(
    <Router>
        <div>
            <nav>
                <ul>
                    {recipes && recipes.map(recipe => <RecipeRow key={recipe.id} recipe={recipe} />)}
                </ul>
            </nav>
            <AddNewRecipe />
            <Switch>
                {recipes && recipes.map(recipe => <Route path={"/recipe/" + recipe.name}><RecipeFull recipe={recipe} /></Route>)}
            </Switch>
        </div>
    </Router>
    )
}

function AddNewRecipe(){

    const [modal, SetModal] = useState(false);

    return(
        <>
            <Modal show={modal} handleClose={()=> SetModal(false)}>
                <NewRecipeForm handleClose={()=> SetModal(false)}/>
            </Modal>
            <button className="btn btn-primary" onClick={() => SetModal(true)}>Add new recipe</button>
        </>
    )
}

function RecipeRow(props) {
    const { name } = props.recipe;

    return (<>
            <li>
                <Link to={"/recipe/" + name} >{name}</Link>
            </li>
    </>)
}

export default Recipes;