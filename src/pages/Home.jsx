import Title from "../components/Title.jsx";
import Surface from "../components/Surface.jsx";
import Button from "../components/Button.jsx";

function Subtitle() {
    return <h2 class='subtitle'>Connect educators with video creators.</h2>;
}

function Buttons() {
    return (
        <div className='button-container'>
            <Button to='/signup'>I'm an educator</Button>
            <Button to='/signup'>I'm an animator</Button>
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
                educators are able to request an animator's work.
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
