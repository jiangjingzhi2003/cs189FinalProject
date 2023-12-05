import style from "./BlogStyle.module.css"
import PostBlock from "./PostBlock"
import { useEffect, useState } from "react";
import Axios from "axios";

function Blog() {
    const [posts, setPosts] = useState([])
    let uniquePost;

    useEffect(() => {
        Axios.get("https://full-stack-backend-api.onrender.com/api/getRandomPost")
        .then(response => {
            console.log(response);
            setPosts(response.data)
        })
        .catch((error)=> 
            console.log(error))
    },[]);

    return (
        <>
            <div className={style["blog"]}>
                {   
                    posts.map((data) => {
                    return (
                        <div key={data.toString()}>
                            <PostBlock title={data.title} text={data.text} author={data.author} likes={parseInt(data.likes)}/>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Blog;