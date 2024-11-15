import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import './style/styles.css';

const Navbar = (props) => {
    /* props.toggleSettings */
    return (
        <>
            <div className="navbar">
                <div className="navbar-logo dynapuff-piano-party">
                    <h1>Piano Party</h1>
                </div>
                <div className="navbar-settings">
                    <FontAwesomeIcon className="hoverable-item" icon={faGear} onClick={props.toggleSettings}/>
                </div>
            </div>
        </>
    );
};

export default Navbar;