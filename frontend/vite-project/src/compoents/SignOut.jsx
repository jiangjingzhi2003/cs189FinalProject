import {signOut } from "firebase/auth";
import {auth} from "../Firebase/firebaseApp"
import { useNavigate } from 'react-router-dom'
import "./SignOutStyle.css"

function SignOut() {

    const nav = useNavigate()
    const handleSignOut = (event) => {
        signOut(auth)
        .then (()=> {
            nav('/')
        })
    }

    return (
        <button onClick={handleSignOut} id="signOut">Sign Out</button>
    )
}

export default SignOut