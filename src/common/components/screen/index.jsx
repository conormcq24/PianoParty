import React from 'react';
import Tracks from '../tracks/index';
import WhiteKeys from '../whiteKeys/index';
import './style/styles.css';
const Screen = (props) => {
    return (
        <>
            <div className="screen">
                <Tracks />
                <WhiteKeys activeKeys={props.activeKeys}/>
            </div>
        </>
    );
};

export default Screen;