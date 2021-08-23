import Surface from "../components/Surface.jsx";

export default function Contact() {
    return (
        <Surface>
            <h2>Contact Us</h2>
            {/* add more icons */}
            <ul>
                <li>
                    <a href='mailto:support@parallel.com' className='link'>
                        support@parallel.com
                    </a>
                </li>
                <li>
                    <a
                        href='https://github.com/zyrrus/parallel'
                        className='link'>
                        Github
                    </a>
                </li>
                <li>
                    <a href='tel:123-456-1234' className='link'>
                        123-456-1234
                    </a>
                </li>
            </ul>
        </Surface>
    );
}
