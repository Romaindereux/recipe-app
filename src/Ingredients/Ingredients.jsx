import firebase from "firebase/app";
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import {useState} from "react";
import Modal from "../General/Modal";
import NewIngredientForm from "./NewIngredientForm";

const firestore = firebase.firestore();
const auth = firebase.auth();



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

function Ingredients() {

    const ingredientRef = firestore.collection('ingredients');
    const query = ingredientRef.orderBy('name');
    const [ingredients] = useCollectionData( query, { idField: 'id' });



    return (
        <div className="container">
            <AddNewIngredient />
            <table className="table">
                <thead>
                <tr>
                    <th>Ingredient</th>
                    <th>Unit</th>
                </tr>
                </thead>
                <tbody>
            {ingredients && ingredients.map(ing => <IngredientRow key={ing.id} ingredient={ing} />)}
                </tbody>
            </table>
        </div>
    );
}

function IngredientRow(props) {
    const { name, unit} = props.ingredient;

    return (<>
        <tr>
            <td>{name}</td>
            <td>{unit}</td>
        </tr>
    </>)
}

function AddNewIngredient(){

    const [modal, SetModal] = useState(false);

    return(
        <>
            <Modal show={modal} handleClose={()=> SetModal(false)}>
                <NewIngredientForm handleClose={()=> SetModal(false)}/>
            </Modal>
            <button className="btn btn-dark" onClick={() => SetModal(true)}>Add new ingredient</button>
        </>
    )
}
export default Ingredients;