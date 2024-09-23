"use client";

import { useState } from "react";
import Login from "./login";
import SignUp from "./signup";

export default function Auth() {
    const [signIn, setSignIn] = useState(false);
    const setSignInFunction = (state: boolean) => {
        setSignIn(state);
    };
    return (
        <>
            {signIn ? (
                <Login setSignInFunction={setSignInFunction} />
            ) : (
                <SignUp setSignInFunction={setSignInFunction} />
            )}
        </>
    );
}
