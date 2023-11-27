import style from "./Menu.module.css"
import Button from "./Button"
import homeIcon from "../images/homeicon.png"
import userProfile from "../images/userProfile.jpeg"

function Meun() {
    return(
        <>
            <div className={style['menu']}>
                <ul className={style["menuList"]}>

                    <li>
                        <a href="/" ><img src={homeIcon} className={style["menuImage"]} id={style["home"]}/></a>
                    </li>

                    <li>
                        <a href="/userProfile" ><img src={userProfile} className={style["menuImage"]} id={style["user"]}/></a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Meun