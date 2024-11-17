import React from 'react';
import './style/styles.css';

const MiddleTrack = (props) => {
  // Check if the note contains 'B' or 'E'
  const shouldHide = /[BE]/i.test(props.note) || props.note === "C#8";

  return (
    <div className={`middle-track ${shouldHide ? 'hidden' : ''}`}>
      <div className="middle-track-lane">
      </div>
    </div>
  );
};

export default MiddleTrack;
