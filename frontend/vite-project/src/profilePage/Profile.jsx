import image from "../images/userProfile.png"
import image2 from "../images/BGuser.avif"
import "./ProfileStyle.css"
import Meun from "../compoents/Meun"
import { useEffect, useState } from "react"
import {auth} from "../Firebase/firebaseApp"
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import Axios from "axios";
import {Link} from "react-router-dom"

function Profile() {
  const [likes ,setLikes] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const nav = useNavigate();

  let userEmail = "jim@gmail.com";

  const listen = onAuthStateChanged(auth, (user) => {
    if (user) {
        setEmail(user.email);
        Axios.get ("https://full-stack-backend-api.onrender.com/api/getUserDataByEmail/"+email)
        .then ( (response) => {
            setName(response.data.name) //get current username
            console.log(name)
        }
        )
        .catch ((error) => {
          console.log(error)
        })
    } else {
        setEmail('');
        nav("/");
    }
  })
  
  console.log(email)
  useEffect (() => {
    listen;
  },[])

  return (
    <div className = "profile">
          <div className="Meun"><Meun/></div>
          <div className = "profileCover">
            <img className = "profileCoverImg" 
            src = {image} 
            alt = ""></img>
          </div>
          <div className= "infobox">
            <h1 className = "name">{name}</h1>
            <p className = "bio"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. 
                                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.
            </p>
          </div>
          <img className= "background"
            src = {image2}
            alt = ""></img>
          <div className = "infobox2">
            <p className="followers">FOLLOWERS</p>
            <p className="following">FOLLOWING</p>
            <p className="likes"> LIKES</p>
            <p className="z"> 0 </p>
            <p className="y"> 0 </p>
            <p className="x"> 0 </p>
          </div>
          <Link to="/upload" className="uploadButton"><button>upload</button></Link>
    </div>
  )
}
export default Profile