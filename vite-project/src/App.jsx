import { useState } from 'react'
import './App.css'
import Post from './postPage/Posts'
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom"

function Login() {
  return (
    <>
      <h1 className='title'>HomePage</h1>
      <div className='LogInBox'>
        <h2 id='emailText'>email:</h2>
        <input type="text" className='emailBox' name='email'></input>
        <br/>
        <h2 id='passwordText'>password:</h2>
        <input type="text" className='password'></input>
        <br/>
        
        <Link to="/post">
          <button className='LoginButton'>Login</button>
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
