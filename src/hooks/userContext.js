import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "../fire";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const observer = onAuthStateChanged(fireAuth, (user) => {
            if (user) {
                setCurrentUser(user);
                setIsSignedIn(true);
            } else {
                setCurrentUser(null);
                setIsSignedIn(false);
            }
        });
        return observer;
    }, [currentUser, isSignedIn]);

    return (
        <UserContext.Provider
            value={{ isSignedIn, currentUser, setIsSignedIn }}>
            {children}
        </UserContext.Provider>
    );
};
