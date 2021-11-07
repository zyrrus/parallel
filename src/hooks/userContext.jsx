import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "../fire";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        onAuthStateChanged(fireAuth, (user) => {
            setCurrentUser(user);
            if (user) setIsSignedIn(true);
        });
    }, []);

    return (
        <UserContext.Provider value={{ isSignedIn, currentUser }}>
            {children}
        </UserContext.Provider>
    );
};
