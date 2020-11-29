import {ErrorMessage, Form, Field, Formik, useFormik, useField, getIn} from 'formik';

import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';
const auth = firebase.auth();
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

function validate(values){
    const errors = {};

    if(!values.name){
        errors.name = 'Required';
    }
    if(!values.unit){
        errors.unit = 'Required';
    }

    return errors;
}
function NewIngredientForm({handleClose}){

    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    unit: ''
                }}
                validate={validate}
                onSubmit={(values, {resetForm, setSubmitting}) =>{
                    const name = values.name;
                    const nameString = name.toString();
                    const unit = values.unit;
                    const {uid} = auth.currentUser;
                    //TODO Name already exist
                    firestore.collection('ingredients').doc(nameString).set({
                        name: name,
                        unit: unit,
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
                        <label htmlFor="name">Ingredient name</label>
                        <Field name="name" />
                        <ErrorMessage name="name">{msg => <div style={{color:'red'}}>{msg}</div>}</ErrorMessage>
                    </div>
                    <div className="form-group">
                        <label htmlFor="unit">Unit</label>
                        <Field name="unit"/>
                        <ErrorMessage name="unit">{msg => <div style={{color:'red'}}>{msg}</div>}</ErrorMessage>
                    </div>
                    <button type="submit" className="btn btn-primary">
                         Add ingredient
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default NewIngredientForm;