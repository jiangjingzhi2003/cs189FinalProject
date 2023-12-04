import './NewAccountStyle.css'
import React, { useState } from 'react';
import {auth} from "../Firebase/firebaseApp"
import { AuthErrorCodes, createUserWithEmailAndPassword} from "firebase/auth";
import Axios from "axios"
import { useNavigate } from 'react-router-dom'

function confirm_password(values) {
    let error = {}
    if (!values.confirm_password === values.password) {
        error.conPass="password not match";
    } else {
        error.conPass = "";
    }
    
    return error;
}

function NewAccount() {

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

    const nav = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        let username = userInfo.username.toString();
        let email = userInfo.email.toString();
        let password = userInfo.password.toString();
        setErrors(confirm_password(userInfo))

        let newUser = {
            name: username,
            password: password,
            email: email
        }
        //send userInfo to API
        const url = 'https://full-stack-backend-api.onrender.com/api/addUser';
        try {
            await Axios.post("https://full-stack-backend-api.onrender.com/api/addUser", {
                name: username,
                password: password,
                email: email
            })
        }
        catch(e){
            console.log(newUser);
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            console.log(userCredential.user);
            nav("/");
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