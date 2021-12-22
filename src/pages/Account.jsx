import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { signOutHandler, deleteHandler } from "../handlers/userHandlers";
import useError from "../hooks/useError";
import { UserContext } from "../hooks/userContext";
import Password from "../components/Password";

export default function Account() {
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
