import React from 'react';

import Title from '../components/Title.jsx';
import Button from '../components/Button.jsx';


function Navbar() {
    return (
        <nav>
            <Title />
            <ul>
                <li><Button to="/home">Home</Button></li>
                <li><Button to="/discover">Discover</Button></li>
                <li><Button to="/contact">Contact</Button></li>
                <li><Button to="/login">Log In</Button></li>
                <li><Button to="/signup" emphasized>Sign Up</Button></li>
            </ul>
        </nav>
    );
}

export default function BasePage({ children }) {
  return (
    // add background image class
    <div>
        <Navbar />
        { children }
    </div>
  );
}
