import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
    signUpHandler,
    logInHandler,
    signOutHandler,
    deleteHandler,
} from "./handlers/userHandlers";
import { getPostsHandler, postingHandler } from "./handlers/postHandlers";
import useError from "./hooks/useError";
import { UserContext } from "./hooks/userContext";

function Account() {
    const { register, handleSubmit } = useForm();
    const { isSignedIn, currentUser } = useContext(UserContext);
    const [error, setError] = useError();
    const [showPopup, setShowPopup] = useState(false);

    const handleLogout = () => {
        signOutHandler();
    };
    const handleDelete = async (data) => {
        await deleteHandler(currentUser, data.password, setError);
        setShowPopup(false);
    };

    const pwPopup = (
        <form onSubmit={handleSubmit(handleDelete)}>
            <h3>Enter password to confirm.</h3>
            <Password register={register} />
            <p style={{ color: "red" }}>{error}</p>
            <input type='submit' value='Delete Account' />
        </form>
    );

    return (
        <section>
            <h1>Account</h1>

            {isSignedIn && currentUser ? (
                <>
                    <p>{currentUser.displayName}</p>
                    <p>{currentUser.email}</p>
                    <p>{currentUser.uid}</p>
                    <div className='button' onClick={handleLogout}>
                        Log Out
                    </div>
                    {showPopup ? (
                        pwPopup
                    ) : (
                        <>
                            <p style={{ color: "red" }}>{error}</p>
                            <div
                                className='button'
                                onClick={() => setShowPopup(true)}>
                                Delete Account
                            </div>
                        </>
                    )}
                </>
            ) : (
                <p>Not logged in</p>
            )}
        </section>
    );
}

function Input({ label, data, register }) {
    return (
        <>
            <label htmlFor={data}>{label}</label>
            <input
                placeholder={label}
                {...register(data, { required: true })}
            />
            <br />
        </>
    );
}

function Password({ register }) {
    return (
        <>
            <label htmlFor='password'>Password</label>
            <input
                placeholder='Password'
                type='password'
                {...register("password", { required: true })}
            />
            <br />
        </>
    );
}

function LogIn() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useError();

    const handleLogin = (data) => {
        logInHandler(data, setError);
    };

    return (
        <div className='login'>
            <h3>Log In</h3>
            <form onSubmit={handleSubmit(handleLogin)}>
                <Input
                    label='Username or Email'
                    data='input'
                    register={register}
                />
                <Password register={register} />
                <p style={{ color: "red" }}>{error}</p>
                <input type='submit' value='Submit' />
            </form>
        </div>
    );
}

function SignUp() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useError();

    const handleSignup = (data) => {
        signUpHandler(data, setError);
    };

    return (
        <div className='signup'>
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit(handleSignup)}>
                <Input label='Username' data='username' register={register} />
                <Input label='Email' data='email' register={register} />
                <Password register={register} />
                <label>Account type:</label>
                <br />
                <input
                    {...register("account", { required: true })}
                    type='radio'
                    value='animator'
                />
                <label>Animator</label>
                <br />
                <input
                    {...register("account", { required: true })}
                    type='radio'
                    value='educator'
                />
                <label>Educator</label>
                <br />
                <p style={{ color: "red" }}>{error}</p>
                <input type='submit' value='Submit' />
            </form>
        </div>
    );
}

function SignIn() {
    return (
        <section>
            <h1>Sign In</h1>
            <SignUp />
            <LogIn />
        </section>
    );
}

function Discover() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useError();
    const { isSignedIn, currentUser } = useContext(UserContext);
    const [posts, setPosts] = useState(getPostsHandler());
    const [showPopup, setShowPopup] = useState(false);

    const handlePosting = (data) => {
        postingHandler(currentUser, data, setError);
        setShowPopup(false);
    };

    const postPopup = (
        <form onSubmit={handleSubmit(handlePosting)}>
            <h3>Create post</h3>
            <Input label='Title' data='title' register={register} />
            <Input label='Description' data='body' register={register} />
            <p style={{ color: "red" }}>{error}</p>
            <input type='submit' value='Post' />
        </form>
    );

    return (
        <section>
            <h1>Discover</h1>

            {isSignedIn && currentUser && (
                <>
                    {showPopup ? (
                        postPopup
                    ) : (
                        <>
                            <p style={{ color: "red" }}>{error}</p>
                            <div
                                className='button'
                                onClick={() => setShowPopup(true)}>
                                + Post
                            </div>
                        </>
                    )}
                </>
            )}
            {posts && posts.foreach((doc) => <p>Hi</p>)}
        </section>
    );
}

export default function App() {
    return (
        <div>
            <Account />
            <SignIn />
            <Discover />
        </div>
    );
}
