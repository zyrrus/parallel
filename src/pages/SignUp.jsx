import React from "react";
// import fire from "../fire.js";
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
            <p className='error-message'>{emailError}</p>
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
            <p className='error-message'>{passwordError}</p>
        </>
    );
};

const Submit = ({ children }) => {
    return (
        <div className='button-container'>
            <button className='button' type='submit'>
                {children}
            </button>
        </div>
    );
};

const SignUpFooter = () => {
    return (
        <>
            <Submit>Sign Up</Submit>
            <p>
                Already have an account?
                <a href='/login' className='link'>
                    Log In
                </a>
            </p>
        </>
    );
};

const LogInFooter = () => {
    return (
        <>
            <Submit>Log In</Submit>
            <p>
                Don't have an account?
                <a href='/signup' className='link'>
                    Sign Up
                </a>
            </p>
        </>
    );
};

// The SignUp component provides an interface for the Register component
// to authenticate users
export default function SignIn(props) {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        emailError,
        passwordError,
    } = props;

    return (
        <Surface>
            <form onSubmit={hasAccount ? handleLogin : handleSignup}>
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
                <div>{hasAccount ? <LogInFooter /> : <SignUpFooter />}</div>
            </form>
        </Surface>
    );
}
