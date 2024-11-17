import React from 'react';
import Tracks from '../tracks/index';
import Keyboard from '../keyboard/index';
import './style/styles.css';
const Screen = (props) => {
    const songMilisec = 120000 /* two minutes in milliseconds */
    return (
        <>
            <div className="screen">
                <Tracks songMilisec={songMilisec}/>
                <Keyboard />
            </div>
        </>
    );
};

export default Screen;