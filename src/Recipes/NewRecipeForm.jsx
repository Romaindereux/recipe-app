import {ErrorMessage, Form, Field, Formik, useFormik, useField, getIn} from 'formik';

import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

import { useState } from 'react';
const auth = firebase.auth();
const firestore = firebase.firestore();

const instructionsInitial = [
    {
        number: 1,
        value: '',
    }
];
const ingredientsInitial = [
    {
        number: 1,
        value: '',
    }
];
const ingredientsAmountInitial = [
    {
        number: 1,
        value: '',
    }
];

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

function validate(values){
    const errors = {};

    if(!values.name){
        errors.name = 'Required';
    }
    // if(!values.unit){
    //     errors.unit = 'Required';
    // }

    return errors;
}

function NewRecipeForm({handleClose}){

    const [instructions, setInstructions] = useState(instructionsInitial);
    const [number, setNumber] = useState(2);
    const [ingredients, setIngredients] = useState(ingredientsInitial);
    const [numberIngredients, setNumberIngredients] = useState(2);
    const [ingredientsAmount, setIngredientsAmount] = useState(ingredientsAmountInitial);
    const [numberIngredientsAmount, setNumberIngredientsAmount] = useState(2);

    function handleAdd(e) {
        e.preventDefault();
        setNumber((number)=>number+1);
        const newInstructions = instructions.concat({ number });
        setInstructions(newInstructions);
    }
    function handleAddIngredient(e) {
        e.preventDefault();
        setNumberIngredients((numberIngredients)=>numberIngredients+1);
        const newIngredients = ingredients.concat({ numberIngredients });
        setIngredients(newIngredients);
    }
    function handleAddIngredientAmount(e) {
        e.preventDefault();
        setNumberIngredientsAmount((numberIngredientsAmoun)=>numberIngredientsAmount+1);
        const newIngredientsAmount = ingredientsAmount.concat({ numberIngredientsAmount });
        setIngredientsAmount(newIngredientsAmount);
    }

    return (
        <div>
            <Formik
                initialValues={{
                    cooking_time: 0,
                    ingredients: [],
                    ingredients_amount: [],
                    instructions: [],
                    name: '',
                    number_of_people: 0,
                    preparation_time: 0
                }}
                validate={validate}
                onSubmit={(values, {resetForm, setSubmitting}) =>{
                    console.log(values);
                    const instructions = [];
                    const ingredients = [];
                    const ingredients_amount = [];
                    Object.keys(values).forEach(function (key){
                        if (key.startsWith("instruction")){
                            instructions.push(values[key]);
                        }else if(key.startsWith("ingredientAmount")){
                            ingredients_amount.push(values[key]);
                        }else if(key.startsWith("ingredient")){
                            ingredients.push(values[key]);
                        }
                    });
                    instructions.shift();
                    ingredients.shift();
                    ingredients.shift();
                    console.log(ingredients);
                    const cooking_time = values.cooking_time;


                    const name = values.name;
                    const nameString = name.toString();
                    const number_of_people = values.number_of_people;
                    const preparation_time = values.preparation_time;
                    const {uid} = auth.currentUser;
                    firestore.collection('recipes').doc(nameString).set({
                        cooking_time:cooking_time,
                        ingredients:ingredients,
                        ingredients_amount:ingredients_amount,
                        instructions:instructions,
                        name:name,
                        number_of_people:number_of_people,
                        preparation_time:preparation_time,
                        uid
                    }).then(res=>{
                        console.log("ok");
                        handleClose();
                    }).catch(e=>{
                        console.error(e.message);
                    });
                }}
            >
                <Form>
                    <div className="form-group">
                        <label htmlFor="name">Recipe name</label>
                        <Field name="name" />
                        <ErrorMessage name="name">{msg => <div style={{color:'red'}}>{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cooking_time">Cooking Time</label>
                        <Field name="cooking_time"/>
                        <ErrorMessage name="cooking_time">{msg => <div style={{color:'red'}}>{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="form-group">
                        <label htmlFor="preparation_time">Preparation Time</label>
                        <Field name="preparation_time"/>
                        <ErrorMessage name="preparation_time">{msg => <div style={{color:'red'}}>{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="form-group">
                        <label htmlFor="number_of_people">Number of people</label>
                        <Field name="number_of_people"/>
                        <ErrorMessage name="number_of_people">{msg => <div style={{color:'red'}}>{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="form-group">
                            {instructions.map((instruction) => (
                                <>
                                    <label htmlFor={"instruction"+instruction.number}>Instruction {instruction.number}</label>
                                    <Field name={"instruction"+instruction.number} as="textarea"  className="form-textarea"/>
                                </>
                            ))}
                        <button className="btn btn-success" onClick={handleAdd}>+</button>
                    </div>
                    <div className="form-group">
                        {ingredients.map((ingredient) => (
                            <>
                                <label htmlFor={"ingredient"+ingredient.numberIngredients}>Ingredient {ingredient.numberIngredients}</label>
                                <Field name={"ingredient"+ingredient.numberIngredients} className="form-textarea"/>
                            </>
                        ))}
                        <button className="btn btn-success" onClick={handleAddIngredient}>+</button>
                    </div>
                    <div className="form-group">
                        {ingredientsAmount.map((ingredientAmount) => (
                            <>
                                <label htmlFor={"ingredientAmount"+ingredientAmount.numberIngredientsAmount}>Ingredient amount{ingredientAmount.numberIngredientsAmount}</label>
                                <Field name={"ingredientAmount"+ingredientAmount.numberIngredientsAmount} className="form-textarea"/>
                            </>
                        ))}
                        <button className="btn btn-success" onClick={handleAddIngredientAmount}>+</button>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add recipe
                    </button>
                </Form>
            </Formik>
        </div>
    );
};




export default NewRecipeForm;