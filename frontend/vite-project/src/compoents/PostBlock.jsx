import Axios from "axios";

function PostBlock() {
    let postData = "";

    Axios.get("http://localhost:3000/api/getUserPost" ,{
        params: {
            custom_data : "yucMZZ4WYWQvx5q4XpLHpdY9DV02"
        }
    })
    .then((response) => {
        postData = response.data.text;
    })
    return (
        <div>
            {postData}
        </div>
    )
}

export default PostBlock