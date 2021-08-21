import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Surface from "../components/Surface.jsx";

const EmailInput = (props) => {
    const { email, setEmail, emailError } = props;

    return (
        <>
            <label>Email</label>
            <input
                type='text'
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <p className='errorMessage'>{emailError}</p>
        </>
    );
};

const PassInput = (props) => {
    const { password, setPassword, passwordError } = props;

    return (
        <>
            <label>Password</label>
            <input
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <p className='errorMessage'>{passwordError}</p>
        </>
    );
};

export default function SignUp(props) {
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
            <h2>{hasAccount ? "Log in" : "Sign up"}</h2>
            <EmailInput
                email={email}
                setEmail={setEmail}
                emailError={emailError}
            />
            <PassInput
                password={password}
                setPassword={setPassword}
                passwordError={passwordError}
            />

            <div>
                {hasAccount ? (
                    <>
                        <button onClick={handleLogin}>Log In</button>
                        <p>
                            Don't have an account?
                            <Link to='/signup'>Sign Up</Link>
                        </p>
                    </>
                ) : (
                    <>
                        <button onClick={handleSignup}>Sign Up</button>
                        <p>
                            Already have an account?
                            <Link to='/login'>Log In</Link>
                        </p>
                    </>
                )}
            </div>
        </Surface>
    );
}
