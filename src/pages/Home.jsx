import Title from "../components/Title.jsx";
import Surface from "../components/Surface.jsx";
import { ButtonTo } from "../components/Buttons.jsx";

function Subtitle() {
    return (
        <h2 className='subtitle'>Connect educators with content creators.</h2>
    );
}

function Buttons() {
    return (
        <div className='button-container'>
            {/* This should probably redirect to discover with the proper filter enabled */}
            <ButtonTo to='/register'>I'm an educator</ButtonTo>
            <ButtonTo to='/register'>I'm an animator</ButtonTo>
        </div>
    );
}

function About() {
    return (
        <Surface>
            <h2>About</h2>
            <p>
                Parallel is a platform meant to connect busy educators with
                eager content creators. Anyone with ideas worth sharing is
                encouraged to sign up as an "Educator" and post "jobs" on the
                discover page. Content creators can sign up as "Animators" to
                accept these jobs from educators. Alternatively, animators can
                make their own discover page posts to present their skills so
                that educators can commission their work.
            </p>
        </Surface>
    );
}

export default function Home() {
    return (
        <>
            <Title />
            <Subtitle />
            <Buttons />
            <About />
        </>
    );
}
