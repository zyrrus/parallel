import React, { useState, useEffect } from "react";
import fire from "../fire";

import Surface from "../components/Surface.jsx";

// TODO: the page should be Login, SignUp should be it's own registration component higher up (in app?)

const LogIn = (props) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
    } = props;

    return (
        <Surface>
            <label>Username</label>
            <input
                type='text'
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <p className='errorMessage'>{emailError}</p>

            <label>Password</label>
            <input
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <p className='errorMessage'>{passwordError}</p>

            <div className='btn-container'>
                {hasAccount ? (
                    <>
                        <button onClick={handleLogin}>Sign In</button>
                        <p>
                            Don't have an account?{" "}
                            <span onClick={() => setHasAccount(!hasAccount)}>
                                Sign Up
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <button onClick={handleSignup}>Sign Up</button>
                        <p>
                            Have an account?{" "}
                            <span onClick={() => setHasAccount(!hasAccount)}>
                                Sign In
                            </span>
                        </p>
                    </>
                )}
            </div>
        </Surface>
    );
};

export default function SignUp() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [hasAccount, setHasAccount] = useState(false);

    const clearInputs = () => {
        setEmail("");
        setPassword("");
    };

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    };

    const handleLogin = () => {
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
                }
            });
    };

    const handleSignup = () => {
        clearErrors();
        fire.auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                switch (err.code) {
                    case "auth/email-alread-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const handleLogout = () => {
        fire.auth().signOut();
    };

    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                clearInputs();
                setUser(user);
            } else {
                setUser("");
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);

    return (
        <LogIn
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
        />
    );
}
