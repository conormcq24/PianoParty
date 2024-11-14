import React from 'react';
import './style/styles.css';

const BlackKey = (props) => {
  let keyStyle = {
      background: 'linear-gradient(220deg, black 1%, #232323 99%)', // Example gradient
    };

    if (Array.isArray(props.activeKeys)) {
      const matchedKey = props.activeKeys.find(activeKey => activeKey.note === props.noteOctave && activeKey.isActive);

      if (matchedKey && matchedKey.isActive) {
        keyStyle = { background: 'linear-gradient(220deg, darkgreen 1%, green 99%)' };
      }
    }

  return (
    <div className="black-key-space" style={props.style}>
        <div className="black-key" style={keyStyle}>
            {props.noteOctave}
        </div>
    </div>
  );
};

export default BlackKey;
