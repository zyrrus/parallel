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

            <h1>Future improvements</h1>
            <Surface classes={["contact"]}>
                <ul>
                    <li>
                        <h4>Upgrade the Discover page.</h4>
                        <p>
                            The current posting is boring and almost useless.
                            Things like tags, filters for those tags, and a
                            user-tailored feed would dramatically improve the
                            page.
                        </p>
                    </li>
                    <li>
                        <h4>Add more account features</h4>
                        <p>
                            Profile pictures, email verification, change
                            password, add bio, add fields of study/interest
                            (these could determine what shows up in the discover
                            feed)
                        </p>
                    </li>
                    <li>
                        <h4>Improve the look and feel</h4>
                        <p>
                            Fix minor annoyances and add icons + more animations
                        </p>
                    </li>
                    <li>
                        <h4>Check for performance issues</h4>
                        <p>
                            My reckless use of useEffect would probably give
                            React devs nightmares... maybe I should look into
                            that.
                        </p>
                    </li>
                    <li>
                        <h4>…</h4>
                    </li>
                </ul>
            </Surface>
        </>
    );
}
