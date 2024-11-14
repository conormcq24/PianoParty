import React from 'react';
import './style/styles.css';

const WhiteKey = (props) => {
  // Initialize the keyStyle with the gradient (for inactive keys)
  let keyStyle = {
    background: 'linear-gradient(to top, #fff, #e1e1e1)', // Example gradient
  };

  // Check if the key is active
  if (Array.isArray(props.activeKeys)) {
    const matchedKey = props.activeKeys.find(activeKey => activeKey.key === props.noteOctave);

    if (matchedKey && matchedKey.isActive) {
      // If the key is active, override the gradient with the red background
      keyStyle = { backgroundColor: 'red' };
    }
  }

  return (
    <div className="white-key" style={keyStyle}>
      {props.noteOctave}
    </div>
  );
};

export default WhiteKey;
