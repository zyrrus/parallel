import { useForm } from "react-hook-form";

import { handleSignUp } from "./firehandler";

function Account() {
    return (
        <section>
            <h1>Account</h1>
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
    const handleLogin = (data) => {
        console.log(data);
    };

    return (
        <div className='login'>
            <h3>Log In</h3>
            <form onSubmit={handleSubmit(handleLogin)}>
                {/* Username or Email */}
                <Input
                    label='Username or Email'
                    data='user-or-email'
                    register={register}
                />
                {/* Password */}
                <Password register={register} />
                <input type='submit' value='Submit' />
            </form>
        </div>
    );
}

function SignUp() {
    const { register, handleSubmit } = useForm();
    const handleSignup = (data) => {
        console.log(data);
        handleSignUp(data.username, data.email, data.password);
    };

    return (
        <div className='signup'>
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit(handleSignup)}>
                {/* Username */}
                <Input label='Username' data='username' register={register} />
                {/* Email */}
                <Input label='Email' data='email' register={register} />
                {/* Password */}
                <Password register={register} />
                {/* Account Type */}
                <label>Account type:</label>
                <br />
                <input
                    {...register("account ", { required: true })}
                    type='radio'
                    value='animator'
                />
                <label>Animator</label>
                <br />
                <input
                    {...register("account ", { required: true })}
                    type='radio'
                    value='educator'
                />
                <label>Educator</label>
                <br />
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
    return (
        <section>
            <h1>Discover</h1>
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
