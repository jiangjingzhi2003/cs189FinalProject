import './NewAccountStyle.css'
import React, { useState } from 'react';

function NewAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setuserName] = useState('');
    const [conPass, setConPass] = useState('');
    const [userInfo, setUserInfo] = useState({
        email:'',
        username:'',
        password:'',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email)
    }

    return (
        <>
            <form action="/create_account" method="post" onSubmit={handleSubmit}>

                <div><label for="username">Username:</label></div>
                <input value={username} onChange={(e) => setuserName(e.target.value)} type="text" id="username" name="username" required/>
                <br/>

                <div><label for="email">Email:</label></div>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" required/><br/>

                <div><label for="password">Password:</label></div>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required/><br/>

                <div><label for="confirm_password">Confirm Password:</label></div>
                <input value= {conPass} onChange={(e) => setConPass(e.target.value)} type="password" id="confirm_password" name="confirm_password" required/><br/>

                <br/>
                <div className='submit'><input type="submit" value="Create Account"/></div>
            </form>
        </>
    )
}

export default NewAccount;