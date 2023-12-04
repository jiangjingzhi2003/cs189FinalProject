import { useState } from "react";
import "./UploadStyle.css"
import Axios from "axios";
import {auth} from "../Firebase/firebaseApp"
import Meun from "../compoents/Meun";



function Upload() {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const user = auth.currentUser; //get current user


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await Axios.post("https://full-stack-backend-api.onrender.com/api/addPost", {
                author : user.uid,
                likes : 0,
                text:text,
                title: title
            })
        }
        catch(e){
            console.log("fail to post")
            console.log(postInfo);
        }
    }

    return (
        <>
            <Meun/>
            <h2>Upload Your Post</h2>

            <form encType="multipart/form-data" action="/submit" method="post" onSubmit={handleSubmit}>

                <input value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    id="titleInput" 
                    type="text" 
                    name="title"
                    placeholder="Enter Title"/><br/>

                <label htmlFor="text" id="content">Enter Text:</label><br/>
                <textarea 
                    id="text" 
                    name="text" 
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type your first post!"/><br/><br/>

                <input type="submit" value="Upload" id="upload"/>
            </form>
        </>
    )
}

export default Upload;