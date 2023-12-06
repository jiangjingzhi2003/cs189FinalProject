import style from "./Menu.module.css"
import Button from "./Button"
import homeIcon from "../images/homeicon.png"
import userProfile from "../images/userProfile.png"
import AuthDetail from "../compoents/AuthDetail";
import SignOut from "./SignOut";
import RefreshButton from "../compoents/RefreshButton";

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
                    <li id={style["signOut"]}><SignOut/></li>
                    <li id={style["Refresh"]}><RefreshButton/></li>
                </ul>
            </div>
        </>
    )
}

export default Meun