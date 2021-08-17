import React from 'react';

import Navbar from '../components/Navbar.jsx';

function BGImage() {
    return (
        <div className="bg-image"></div>
    );
}

export default function BasePage({ children }) {
  return (
    <div className="flex-parent">
        <BGImage />
        <Navbar />
        <div className="content">
            { children }
        </div>
    </div>
  );
}
