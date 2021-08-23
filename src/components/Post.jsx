import Surface from "./Surface.jsx";

export default function Post({ title, user, description }) {
    return (
        <Surface classes={["post"]}>
            <h2>{title}</h2>
            <h3>{user}</h3>
            {/* add image when i know where they'll be stored */}
            <p>{description}</p>
        </Surface>
    );
}
