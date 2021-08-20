import Surface from "../components/Surface.jsx";

export default function Contact() {
    return (
        <Surface>
            <h2>Contact Us</h2>
            {/* add more icons */}
            <ul>
                <li>
                    <a href='mailto:support@parallel.com'>
                        support@parallel.com
                    </a>
                </li>
                <li>
                    <a href='https://github.com/zyrrus/parallel'>Github</a>
                </li>
            </ul>
        </Surface>
    );
}
