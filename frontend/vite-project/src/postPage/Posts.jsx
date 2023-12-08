import Meun from "../compoents/Meun";
import BlogBlock from "../compoents/BlogBlock"
import RefreshButton from "../compoents/RefreshButton";
import {auth} from "../Firebase/firebaseApp"


function Posts() {

    return (
        <>
            <Meun/> 
            <BlogBlock />
        </>
    )
}

export default Posts;