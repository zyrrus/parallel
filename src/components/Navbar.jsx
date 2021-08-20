import React, { useState } from "react";

import Title from "./Title.jsx";
import Button from "./Button.jsx";

function NavIcon() {
    return <div className='nav-icon'></div>;
}

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

            <ul className={"nav-list" + (drawerOpen ? openClasses : "")}>
                <li onClick={removeDrawer}>
                    <Button to='/home'>Home</Button>
                </li>
                <li onClick={removeDrawer}>
                    <Button to='/discover'>Discover</Button>
                </li>
                <li onClick={removeDrawer}>
                    <Button to='/contact'>Contact</Button>
                </li>
                <li onClick={removeDrawer}>
                    <Button to='/login'>Log In</Button>
                </li>
                <li onClick={removeDrawer}>
                    <Button to='/signup' emphasized>
                        Sign Up
                    </Button>
                </li>
            </ul>
        </nav>
    );
}
