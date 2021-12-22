import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    deletePostHandler,
    getPostsHandler,
    postingHandler,
} from "../handlers/postHandlers";
import useError from "../hooks/useError";
import { UserContext } from "../hooks/userContext";
import Input from "../components/Input";

export default function Discover() {
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
