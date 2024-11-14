import React from 'react';
import './style/styles.css';

const MusicScreen = (props) => {
  return (
    <>
        { props.showMusicScreen && (
            <div className="music-screen">
                <div className="music-search-container">
                    <div className="music-search-bar" />
                </div>
            </div>
        )}
    </>
  );
};

export default MusicScreen;