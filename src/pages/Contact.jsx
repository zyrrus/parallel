import Surface from "../components/Surface.jsx";

export default function Contact() {
    return (
        <>
            <h1>Contact Us</h1>
            <Surface classes={["contact"]}>
                <div>
                    <h3>Need to report something or want make a suggestion</h3>
                    <ul>
                        <li>
                            <a
                                href='mailto:support@parallel.com'
                                title='this email is not real'
                                className='link'>
                                support@parallel.com
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>Check out the code for this project</h3>
                    <ul>
                        <li>
                            <a
                                href='https://github.com/zyrrus/parallel'
                                className='link'>
                                github.com/zyrrus/parallel
                            </a>
                        </li>
                    </ul>
                </div>
            </Surface>
        </>
    );
}
