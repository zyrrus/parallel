function Account() {
    return (
        <section>
            <h1>Account</h1>
        </section>
    );
}

function LogIn() {
    return (
        <div className='login'>
            <h3>Log In</h3>
            <form>
                <input
                    type='text'
                    name='username'
                    placeholder='username or email'
                />
                <br />
                <input type='password' name='password' placeholder='password' />
                <br />
                <input type='submit' value='Submit' />
            </form>
        </div>
    );
}

function SignUp() {
    return (
        <div className='signup'>
            <h3>Sign Up</h3>
            <form>
                <input type='text' name='username' placeholder='username' />
                <br />
                <input type='email' name='email' placeholder='email' />
                <br />
                <input type='password' name='password' placeholder='password' />
                <br />
                <label>Account type:</label>
                <br />
                <input type='radio' name='account-type' />
                <label>Animator</label>
                <br />
                <input type='radio' name='account-type' />
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
