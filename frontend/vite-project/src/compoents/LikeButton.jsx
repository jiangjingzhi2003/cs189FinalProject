import React, { useState } from 'react';
import "./LikeButtonStyle.css"

function LikeButton(props) {
   const [likes, setLikes] = useState(props.likes);
   const [liked, setLiked] = useState(false);

   const handleClick = async (event) => {
        setLikes(likes + 1)
        setLiked(true)

   }
   return (
      <button className={`like-button ${liked ? 'liked' : ''}`} 
        onClick={handleClick} >

         {likes} Likes

      </button>
   );
}
export default LikeButton;