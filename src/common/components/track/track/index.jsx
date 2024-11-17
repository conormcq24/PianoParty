import React from 'react';
import './style/styles.css';

const Track = () => {
  const noteCount = 100; // Number of note divs

  return (
    <div className="lane-container">
      {Array.from({ length: noteCount }).map((_, index) => (
        <div className="note" key={index}></div>
      ))}
    </div>
  );
};

export default Track;
