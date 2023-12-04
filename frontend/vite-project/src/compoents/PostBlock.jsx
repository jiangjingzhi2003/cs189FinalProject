import Axios from "axios";
import { useEffect, useState } from "react";
import "./PostBlockStyle.css";
import LikeButton from "./LikeButton";

function PostBlock(props) {
    return (
        <div className="post">
            <div className="titleAndLike">
                <h3 className="title">{props.title}</h3>
                <LikeButton likes={props.likes}/>
            </div>

            <div className="mainContent">
                <p className="text">{props.text}</p>
                <p className="author">{props.author}</p>
            </div>
        </div>
    )
}

export default PostBlock