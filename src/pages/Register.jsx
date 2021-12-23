import { useContext } from "react";
import { useForm } from "react-hook-form";
import { signUpHandler, logInHandler } from "../handlers/userHandlers";
import useError from "../hooks/useError";
import { UserContext } from "../hooks/userContext";
import Input from "../components/Input";
import Password from "../components/Password";

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

export default function Register() {
    return (
        <section>
            <h1>Sign In</h1>
            <SignUp />
            <LogIn />
        </section>
    );
}
