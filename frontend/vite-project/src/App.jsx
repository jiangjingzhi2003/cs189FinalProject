import { useState } from 'react'
import './App.css'
import Post from './postPage/Posts'
import NewAccount from './createAccount/NewAccount'
import LoginValidation from './Login/LoginValidation'
import Profile from './profilePage/Profile'
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "./Firebase/firebaseApp"
import Upload from "./UploadPage/UploadPage"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Router,
  Routes,
} from "react-router-dom"
import Login from "./Login/Login"

const router = createBrowserRouter([
  {
    path:"/login",
    element: <Login/>
  }, 
  {
    path:"/",
    element: <Post/>
  },
  {
    path:"/newAccount",
    element: <NewAccount/>
  },
  {
    path:"/userProfile",
    element: <Profile/>
  },
  {
    path:"/upload",
    element: <Upload/>
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
