import React from 'react';
import './style/styles.css';

const WhiteKey = (props) => {
  let keyStyle = {
    background: 'linear-gradient(220deg, gray 1%, white 99%)', // Example gradient
  };

  if (Array.isArray(props.activeKeys)) {
    const matchedKey = props.activeKeys.find(activeKey => activeKey.note === props.noteOctave && activeKey.isActive);

    if (matchedKey && matchedKey.isActive) {
      keyStyle = { background: 'linear-gradient(220deg, green 1%, white 99%)' };
    }
  }

  return (
    <div className="white-key" style={keyStyle}>
      {props.noteOctave}
    </div>
  );
};

export default WhiteKey;
