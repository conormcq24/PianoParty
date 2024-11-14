import React from 'react';
import './style/styles.css';

const BlackKey = (props) => {
  return (
    <div className="black-key-space" style={props.style}>
        <div className="black-key" />
    </div>
  );
};

export default BlackKey;
