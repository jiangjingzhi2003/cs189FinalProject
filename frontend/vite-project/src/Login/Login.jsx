import { useState } from 'react'
import './LoginStyle.css'
import LoginValidation from './LoginValidation'
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../Firebase/firebaseApp"
import { useNavigate } from 'react-router-dom'
import {
  Link
} from "react-router-dom"
import Axios from "axios"

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const nav = useNavigate();

  const  handleSubmit= async (event) => {
    event.preventDefault();
    console.log(values);
    setErrors(LoginValidation(values));

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential)=> {
        console.log(userCredential);
        nav("/")
      }).catch((error)=> {
        console.log(error);
    })
  }
  return (
    <>
      <h1 className='title'>404</h1>
      <div className='LogInBox'>
        <form action='' onSubmit={handleSubmit}>

          <h2 id='emailText'>email:</h2>

          <input type="email" 
            placeholder="Enter email" 
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            className='emailBox' 
            name='email'/>

          <br/>
          <h2 id='passwordText'>password:</h2>

          <input type="password" 
            placeholder="Enter Password" 
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            className='password' 
            name='password'/>

          <br/>
          
          <div className='Login'>
        
          </div>
          <button type="submit" className='LoginButton'>Login</button>

        </form>
        <br/>
        <Link to="/newAccount" className='CreateNew'>
          create new account
        </Link>
      </div>
    </>
  )
}

export default Login;