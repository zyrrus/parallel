import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import fire from "../fire";
import { UserContext } from "../hooks/UserContext";
import SignIn from "../pages/SignUp";

// The Register component handles the logistics of login/signup
export default function Register({ loginFirst }) {
    const user = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
        setUsernameError("");
    };

    const handleLogin = (e) => {
        e.preventDefault();
        clearErrors();
        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                    default:
                        console.log(err.message);
                        break;
                }
            });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        clearErrors();
        fire.auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((err) => {
                switch (err.code) {
                    case "auth/email-alread-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                    default:
                        console.log(err.message);
                        break;
                }
            });
    };

    // Not allowed on the login/signup page when logged in
    if (user) {
        return <Redirect to='/account' />;
    }

    return (
        <SignIn
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={loginFirst ? true : false}
            emailError={emailError}
            passwordError={passwordError}
        />
    );
}
