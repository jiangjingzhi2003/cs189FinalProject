import './NewAccountStyle.css'
import React, { useState } from 'react';
import {auth} from "../Firebase/firebaseApp"
import { AuthErrorCodes, createUserWithEmailAndPassword} from "firebase/auth";

function confirm_password(values) {
    let error = {}
    if (values.confirm_password !== values.password) {
        error.conPass="password not match";
    } else {
        error.conPass = "";
    }
    
    return error;
}

function NewAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setuserName] = useState('');
    const [conPass, setConPass] = useState('');
    const [userInfo, setUserInfo] = useState({
        email:'',
        username:'',
        password:'',
        confirm_password:''
    });
    const[errors ,setErrors] = useState({});
    const[error, setError] = useState(null);

    const handleInput = (event) => {
        setUserInfo(prev => ({...prev, [event.target.name]:[event.target.value]}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let email = userInfo.email.toString();
        let password = userInfo.password.toString();
        setErrors(confirm_password(userInfo))
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            console.log(userCredential.user);
            // ...
        })
        .catch((err) => {
            if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
            setError("The password is too weak.");
        } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
            setError("The email address is already in use.");
        } else {
            console.log(err.code);
            alert(err.code);
        }
        });
    }

    return (
        <>
            <form action="/create_account" method="post" onSubmit={handleSubmit}>

                <div><label htmlFor="username">Username:</label></div>
                <input  onChange={handleInput} type="text" id="username" name="username" required/>
                <br/>

                <div><label htmlFor="email">Email:</label></div>
                <input  onChange={handleInput} type="email" id="email" name="email" required></input><br/>

                <div><label htmlFor="password">Password:</label></div>
                <input  onChange={handleInput} type="password" id="password" name="password" required/><br/>

                <div><label htmlFor="confirm_password">Confirm Password:</label></div>
                <input onChange={handleInput} type="password" id="confirm_password" name="confirm_password" required/><br/>
                {errors.conPass && <span className='text-danger'>{errors.conPass}</span>}

                <br/>
                <div className='submit'><input type="submit" value="Create Account"/></div>
            </form>
        </>
    )
}

export default NewAccount;