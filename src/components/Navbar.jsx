import React, { useState, useEffect } from "react";

import Title from "./Title.jsx";
import { ButtonTo } from "./Buttons.jsx";
import fire from "../fire.js";

const NavIcon = () => {
    return <div className='nav-icon' />;
};

const NavListItem = ({ to, title, emphasized }) => {
    return (
        <li>
            <ButtonTo to={to} emphasized={emphasized}>
                {title}
            </ButtonTo>
        </li>
    );
};

export default function Navbar() {
    const [drawerOpen, setDrawer] = useState(false);
    const [user, setUser] = useState(fire.auth().currentUser);

    const toggleDrawer = () => setDrawer((state) => !state);
    const removeDrawer = () => setDrawer(false);
    const authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser("");
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);

    const openClasses = " nav-list__drawer nav-list__drawer--open";
    const backface = (
        <div className='nav-list__drawer__backface' onClick={toggleDrawer} />
    );

    return (
        <nav>
            {/* Mobile Navigation exit backface panel */}
            {drawerOpen ? backface : undefined}

            <Title />

            {/* Mobile Navigation Menu Button */}
            <div className='nav-icon__container' onClick={toggleDrawer}>
                <NavIcon />
            </div>

            <ul
                className={"nav-list" + (drawerOpen ? openClasses : "")}
                onClick={removeDrawer}>
                <NavListItem to='/home' title='Home' />
                <NavListItem to='/discover' title='Discover' />
                <NavListItem to='/contact' title='Contact' />
                {fire.auth().currentUser ? (
                    <NavListItem to='/account' title='Account' emphasized />
                ) : (
                    <>
                        <NavListItem to='/login' title='Log In' />
                        <NavListItem to='/signup' title='Sign Up' emphasized />
                    </>
                )}
            </ul>
        </nav>
    );
}
