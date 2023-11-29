import { onAuthStateChanged } from "firebase/auth";
import React, {useEffect, useState } from "react";
import {auth} from "../Firebase/firebaseApp"

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
                {authUser ? <>Signed In</> : <>Sign Out</>}
            </div>
        </>
    )
}

export default AuthDetail