import React from 'react';
import Tracks from '../tracks/index';
import Keyboard from '../keyboard/index';
import './style/styles.css';
const Screen = (props) => {
    return (
        <>
            <div className="screen">
                <Tracks />
                <Keyboard />
            </div>
        </>
    );
};

export default Screen;