import { Link } from "react-router-dom";

export default function Title() {
    return (
        <Link to='/'>
            <h1 className='title'>Parallel</h1>
        </Link>
    );
}
