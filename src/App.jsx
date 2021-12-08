import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    signUpHandler,
    logInHandler,
    signOutHandler,
    deleteHandler,
} from "./handlers/userHandlers";
import {
    deletePostHandler,
    getPostsHandler,
    postingHandler,
} from "./handlers/postHandlers";
import useError from "./hooks/useError";
import { UserContext } from "./hooks/userContext";

function Account() {
    const { register, handleSubmit } = useForm();
    const { isSignedIn, currentUser, setIsSignedIn } = useContext(UserContext);
    const [error, setError] = useError();
    const [showPopup, setShowPopup] = useState(false);

    const handleLogout = () => {
        signOutHandler(setIsSignedIn);
    };
    const handleDelete = async (data) => {
        await deleteHandler(
            currentUser,
            data.password,
            setError,
            setIsSignedIn
        );
        setShowPopup(false);
    };
    const handleCancelDelete = () => {
        setShowPopup(false);
    };

    const pwPopup = (
        <form onSubmit={handleSubmit(handleDelete)}>
            <h3>Enter password to confirm.</h3>
            <Password register={register} />
            <p style={{ color: "red" }}>{error}</p>
            <input type='submit' value='Delete Account' />
            <input type='button' value='Cancel' onClick={handleCancelDelete} />
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
                    <input
                        type='button'
                        value='Log Out'
                        onClick={handleLogout}
                    />
                    {showPopup ? (
                        pwPopup
                    ) : (
                        <>
                            <p style={{ color: "red" }}>{error}</p>
                            <input
                                type='button'
                                value='Delete Account'
                                onClick={() => setShowPopup(true)}
                            />
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
    const { setIsSignedIn } = useContext(UserContext);

    const handleLogin = (data) => {
        logInHandler(data, setError, setIsSignedIn);
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
    const { setIsSignedIn } = useContext(UserContext);

    const handleSignup = (data) => {
        signUpHandler(data, setError, setIsSignedIn);
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
    const [posts, setPosts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const handlePosting = (data) => {
        postingHandler(currentUser, data, setError);
        setShowPopup(false);
    };

    const handleCancelPost = () => {
        setShowPopup(false);
    };

    const handleDeletePost = (id) => {
        deletePostHandler(id);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await getPostsHandler();
            setPosts(fetchedPosts);
        };
        fetchPosts();
    }, []);

    const postPopup = (
        <form onSubmit={handleSubmit(handlePosting)}>
            <h3>Create post</h3>
            <Input label='Title' data='title' register={register} />
            <Input label='Description' data='body' register={register} />
            <p style={{ color: "red" }}>{error}</p>
            <input type='submit' value='Post' />
            <input type='button' value='Cancel' onClick={handleCancelPost} />
        </form>
    );

    const makePost = (doc) => {
        const post = doc.post;
        return (
            <div key={doc.id}>
                <h3>{post.title}</h3>
                <h5>
                    {post.username} at{" "}
                    {post.timestamp.toDate().toLocaleString()}
                </h5>
                <p>{post.body}</p>
                {isSignedIn && currentUser && currentUser.uid === post.uid && (
                    <input
                        type='button'
                        value='Delete Post'
                        onClick={() => handleDeletePost(doc.id)}
                    />
                )}
            </div>
        );
    };

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
                            <input
                                type='button'
                                value='+ Post'
                                onClick={() => setShowPopup(true)}
                            />
                        </>
                    )}
                </>
            )}
            {console.log("rerendering")}
            {posts.map((doc) => makePost(doc))}
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
