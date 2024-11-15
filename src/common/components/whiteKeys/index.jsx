import React from 'react';
import WhiteKeyGroup from '../whiteKeyGroup/index';  // Import the KeyGroup component
import './style/styles.css';

const WhiteKeys = (props) => {
  const whiteKeyGroupCount = 8;  // Total of 8 KeyGroups
  return (
    <div className="white-keys">
      {Array.from({ length: whiteKeyGroupCount }).map((_, index) => (
        <WhiteKeyGroup
          key={index}
          octave={index}
          activeKeys={props.activeKeys}
          whiteKeyShadow={props.whiteKeyShadow}
          whiteKeyNoteMarker={props.whiteKeyNoteMarker}
          whiteKeyColor={props.whiteKeyColor}
          whiteKeyColorPressed={props.whiteKeyColorPressed}
          /*
             passes true on index 7,
             on an actual keyboard the 8th group only has 3 white keys
             and one black key. because of this we need to hide all but
             the first black key on our last black key group
          */
          hideAllButFirstBlackKey={index === 7}
        />
      ))}
    </div>
  );
};

export default WhiteKeys;
