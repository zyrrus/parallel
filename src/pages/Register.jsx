import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUpHandler, logInHandler } from "../handlers/userHandlers";
import useError from "../hooks/useError";
import { UserContext } from "../hooks/userContext";
import Input from "../components/Input";
import Password from "../components/Password";
import Surface from "../components/Surface";

function LogIn() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useError();
    const { setIsSignedIn } = useContext(UserContext);

    const handleLogin = (data) => {
        logInHandler(data, setError, setIsSignedIn);
    };

    return (
        <Surface>
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
        </Surface>
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
        <Surface>
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit(handleSignup)}>
                <Input label='Username' data='username' register={register} />
                <Input label='Email' data='email' register={register} />
                <Password register={register} />
                <label>Account type:</label>

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

                <p style={{ color: "red" }}>{error}</p>
                <input type='submit' value='Submit' />
            </form>
        </Surface>
    );
}

export default function Register() {
    const { isSignedIn } = useContext(UserContext);

    if (isSignedIn) return <Navigate to='/account' />;
    return (
        <>
            <h1>Sign In</h1>
            <div className='register'>
                <SignUp />
                <LogIn />
            </div>
        </>
    );
}
