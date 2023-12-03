import Axios from "axios";

function PostBlock() {
    let postData = "";

    Axios.get("http://localhost:3000/api/addPost")
    .then(response => {
        console.log(response)
    })
    return (
        <div>
            {postData}
        </div>
    )
}

export default PostBlock