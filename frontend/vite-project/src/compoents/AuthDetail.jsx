import { onAuthStateChanged } from "firebase/auth";
import React, {useEffect, useState } from "react";
import {auth} from "../Firebase/firebaseApp"
import {
    Link,
  } from "react-router-dom"

function AuthDetail() {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        })

        return listen;
    }, [])

    return (
        <>
            <div>
                {authUser ? <Link>Signed In</Link> : <Link to="/">Login</Link>}
            </div>
        </>
    )
}

export default AuthDetail