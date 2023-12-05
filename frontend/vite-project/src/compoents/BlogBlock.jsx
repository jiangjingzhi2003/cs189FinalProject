import style from "./BlogStyle.module.css"
import PostBlock from "./PostBlock"
import { useEffect, useState } from "react";
import Axios from "axios";

function Blog() {
    const [posts, setPosts] = useState([])

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
                        let curr = posts.indexOf(data);
                        console.log(curr);
                        for(let i=curr; i< 5;i++) {
                            if (posts[i].id == data.id && i != curr) {
                                return(
                                    <></>
                                )
                            }
                        }
                        return (
                            <div key={data.id}>
                                <PostBlock title={data.title} text={data.text} author={data.author} likes={parseInt(data.likes)} id ={data.id}/>
                            </div>
                        );
                })}
            </div>
        </>
    )
}

export default Blog;