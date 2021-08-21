import React, { useState } from "react";

import Title from "./Title.jsx";
import Button from "./Button.jsx";

const NavIcon = () => {
    return <div className='nav-icon'></div>;
};

const NavListItem = ({ to, title, emphasized }) => {
    return (
        <li>
            <Button to={to} emphasized={emphasized}>
                {title}
            </Button>
        </li>
    );
};

export default function Navbar() {
    const [drawerOpen, setDrawer] = useState(false);
    const toggleDrawer = () => setDrawer((state) => !state);
    const removeDrawer = () => setDrawer(false);
    const openClasses = " nav-list__drawer nav-list__drawer--open";
    const backface = (
        <div className='nav-list__drawer__backface' onClick={toggleDrawer} />
    );

    return (
        <nav>
            {drawerOpen ? backface : undefined}

            <Title />

            <div className='nav-icon__container' onClick={toggleDrawer}>
                <NavIcon />
            </div>

            <ul
                className={"nav-list" + (drawerOpen ? openClasses : "")}
                onClick={removeDrawer}>
                <NavListItem to='/home' title='Home' />
                <NavListItem to='/discover' title='Discover' />
                <NavListItem to='/contact' title='Contact' />
                <NavListItem to='/login' title='Log In' />
                <NavListItem to='/signup' title='Sign Up' emphasized />
            </ul>
        </nav>
    );
}
