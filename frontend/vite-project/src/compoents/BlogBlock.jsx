import style from "./BlogStyle.module.css"
import PostBlock from "./PostBlock"

function Blog() {
    return (
        <>
            <div className={style["blog"]}>
                <PostBlock/>
            </div>
        </>
    )
}

export default Blog;