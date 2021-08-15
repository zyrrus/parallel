import React from 'react';

import Title from '../components/Title.jsx';
import Button from '../components/Button.jsx';


function Navbar() {
    return (
        <nav>
            <Title />
            <ul>
                {/* able to change class names when active */}
                <li><Button to="/home">Home</Button></li>
                <li><Button to="/discover">Discover</Button></li>
                <li><Button to="/contact">Contact</Button></li>
                <li><Button to="/register" emphasized>Register</Button></li>
            </ul>
        </nav>
    );
}

export default function BasePage(props) {
  return (
    // add background image class
    <div>
        <Navbar />
        {props.children}
    </div>
  );
}
