import React from 'react';
import './style/styles.css';

const Navbar = (props) => {
    return (
        <>
            <div className="navbar">
                <div className="navbar-logo">
                    <h2>COMBO KEYBOARD</h2>
                </div>
                <div className="navbar-settings">
                    <span role="img" aria-label="settings">
                        ⚙️
                      </span>
                </div>
            </div>
        </>
    );
};

export default Navbar;