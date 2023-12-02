import Meun from "../compoents/Meun";
import BlogBlock from "../compoents/BlogBlock"
import SignOut from "../compoents/SignOut";
import Button from "../compoents/Button"


function Posts() {
    
    return (
        <>
            <Meun/> 
            <BlogBlock/>
            <SignOut/>
            <Button link="/" text="Sign In"/>
        </>
    )
}

export default Posts;