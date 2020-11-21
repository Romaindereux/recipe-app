import {ErrorMessage, Form, Field, Formik, useFormik, useField, getIn} from 'formik';
import './loginForm.css';
import {useState} from "react";


function validate(values){
    const errors = {};

    if(!values.email){
        errors.email = 'Required';
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'Invalid email address';
    }

    if(!values.password){
        errors.password = 'Required';
    }

    return errors;
}

function LoginFormVerbose() {

    const formik = useFormik({
        initialValues:{
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }

    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Adress</label>
            <input type="email"
                   id="email"
                   name="email"                     //
                   onChange={formik.handleChange}   //  Method 1: Explicit
                   onBlur={formik.handleBlur}       //
                   value={formik.values.email}      //
            />
            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div>:null}
            <label htmlFor="password">Password</label>
            <input type="password"
                   id="password"
                   {...formik.getFieldProps('password')}    //Method 2
            />
            {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div>:null}
            <input type="checkbox"
                   id="rememberMe"
                   name="rememberMe"
                   onChange={formik.handleChange}
                   value={formik.values.rememberMe}
            />
            <label htmlFor="rememberMe">Remember Me</label>
            <button type="submit">Connect</button>
        </form>
    );
}

const style = {

}
const styleError = {
    ...style,
    border: "1px solid red"
}

function LoginForm() {

    const [isLoading, setLoading] = useState(false);
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false
            }}
            validate={validate}
            onSubmit={(values, {resetForm, setSubmitting}) =>{
                setLoading(true);
                setTimeout(()=>{
                    setLoading(false);
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    resetForm();
                },1000);

            }}
            >
            <Form>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <Field name="email">
                        {({ field, form }) => (
                            <input className="form-control" type="email"
                                style={form.touched.email && form.errors.email ? styleError : style}
                                {...field}
                            />
                        )}
                    </Field>
                    <ErrorMessage name="email">{msg => <div style={{color:'red'}}>{msg}</div>}</ErrorMessage>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field name="password">
                        {({ field, form }) => (
                            <input className="form-control" type="password"
                                style={form.touched.password && form.errors.password ? styleError : style}
                                {...field}
                            />
                        )}
                    </Field>
                    <ErrorMessage name="password">{msg => <div style={{color:'red'}}>{msg}</div>}</ErrorMessage>
                </div>
                <MyCheckbox name="rememberMe">
                    Remember me
                </MyCheckbox>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading?<div className="spinner-border spinner-border-sm"></div> : 'Connect'}
                </button>
            </Form>
        </Formik>
    );
}

//TODO Add EmailInput && PasswordInput

function MyTextInput({label, ...props}){
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
}

function MyCheckbox({ children, ...props }){
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div>
            <label className="checkbox form-check">
                <input type="checkbox" className="form-check-input" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
}

export default LoginForm;