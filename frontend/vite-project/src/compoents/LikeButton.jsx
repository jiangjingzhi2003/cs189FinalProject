import React, { useState } from 'react';
import "./LikeButtonStyle.css"
import Axios from "axios";

function LikeButton(props) {
   const [likes, setLikes] = useState(props.likes);
   const [liked, setLiked] = useState(false);
   const postId = props.id;

   const handleClick = async (event) => {
         setLikes(likes + 1)
         setLiked(true)
         const data = {likes : likes};
         try {
            await Axios.put("https://full-stack-backend-api.onrender.com/api/likePost/"+postId, data)
         }
         catch(e) {
            console.log(e);
         }
   }
   return (
      <button className={`like-button ${liked ? 'liked' : ''}`} 
        onClick={handleClick} >

         {likes} Likes

      </button>
   );
}
export default LikeButton;