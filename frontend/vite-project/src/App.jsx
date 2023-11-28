import { useState } from 'react'
import './App.css'
import Post from './postPage/Posts'
import NewAccount from './createAccount/NewAccount'
import LoginValidation from './LoginValidation'
import Profile from './profilePage/Profile'
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "./Firebase/firebaseApp"
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom"

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  
  const handleInput= (event) => {
    setValues(prev => ({...prev, [event.target.name]:[event.target.values]}))
  }

  const handleSubmit= (event) => {
    event.preventDefault();
    console.log(values);
    setErrors(LoginValidation(values));
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential)=> {
        console.log(userCredential);
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
const router = createBrowserRouter([
  {
    path:"/",
    element: <Login/>
  }, 
  {
    path:"/post",
    element: <Post/>
  },
  {
    path:"/newAccount",
    element: <NewAccount/>
  },
  {
    path:"/userProfile",
    element: <Profile/>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
