import { useContext } from "react";

import fire from "../fire.js";
import useProtectedRoute from "../hooks/useProtectedRoute.js";
import { ButtonDo } from "../components/Buttons.jsx";
import Surface from "../components/Surface.jsx";
import { UserContext } from "../hooks/UserContext.js";

export default function Account() {
    useProtectedRoute();
    const user = useContext(UserContext);

    const handleSignOut = () => {
        fire.auth().signOut();
    };

    return (
        <Surface>
            <h2>Account</h2>
            {user && <p>Hello, {user.email}!</p>}

            <ButtonDo onClick={handleSignOut}>Sign Out</ButtonDo>
        </Surface>
    );
}
