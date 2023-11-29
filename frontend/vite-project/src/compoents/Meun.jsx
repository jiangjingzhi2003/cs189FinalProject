import style from "./Menu.module.css"
import Button from "./Button"
import homeIcon from "../images/homeicon.png"
import userProfile from "../images/userProfile.jpeg"
import AuthDetail from "../compoents/AuthDetail";

function Meun() {
    return(
        <>
            <div className={style['menu']}>
                <ul className={style["menuList"]}>
                    <li>
                        <a href="/" id={style["LinkHome"]} ><img src={homeIcon} className={style["menuImage"]} id={style["home"]}/></a>
                    </li>
                    <li>
                        <a href="/userProfile"  id={style["LinkUser"]}><img src={userProfile} className={style["menuImage"]} id={style["user"]}/></a>
                    </li>
                    <li className={style["Auth"]}><AuthDetail/></li>
                </ul>
            </div>
        </>
    )
}

export default Meun