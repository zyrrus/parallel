import React, { useState, useContext } from "react";
import { UserContext } from "../hooks/userContext";

import Title from "./Title.jsx";
import { ButtonTo } from "./Buttons.jsx";

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
    const { isSignedIn } = useContext(UserContext);

    const toggleDrawer = () => setDrawer((state) => !state);
    const removeDrawer = () => setDrawer(false);

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
                <NavListItem to='/' title='Home' />
                <NavListItem to='/discover' title='Discover' />
                <NavListItem to='/contact' title='Contact' />

                {isSignedIn ? (
                    <NavListItem to='/account' title='Account' emphasized />
                ) : (
                    <NavListItem to='/register' title='Sign Up' emphasized />
                )}
            </ul>
        </nav>
    );
}
