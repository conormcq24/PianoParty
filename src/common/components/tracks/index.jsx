import React from 'react';
import Track from '../track/index';
import './style/styles.css';

const Tracks = (props) => {
    const trackCount = 52;  // Number of tracks to render

    return (
        <>
            <div className="tracks">
                {Array.from({ length: trackCount }).map((_, index) => (
                    <Track key={index} />  // Render track for each iteration
                ))}
            </div>
        </>
    );
};

export default Tracks;