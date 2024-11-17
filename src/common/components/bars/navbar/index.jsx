import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SettingsContext } from '../../../context/settingsContext/settingsContext';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import './style/styles.css';

const Navbar = (props) => {
    const {
        toggleSettings
      } = useContext(SettingsContext);

    return (
        <>
            <div className="navbar">
                <div className="navbar-logo dynapuff-piano-party">
                    <h1>Piano Party</h1>
                </div>
                <div className="navbar-settings">
                    <FontAwesomeIcon className="hoverable-item" icon={faGear} onClick={toggleSettings}/>
                </div>
            </div>
        </>
    );
};

export default Navbar;