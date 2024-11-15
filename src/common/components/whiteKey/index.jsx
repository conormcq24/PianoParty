import React from 'react';
import { darken } from 'polished';
import './style/styles.css';

const WhiteKey = (props) => {
  const whiteKeyColor = props.whiteKeyColor || "#FFFFFF";
  const whiteKeyColorPressed = props.whiteKeyColorPressed || "palegreen";
  const darkerWhiteKeyColor = darken(0.6, whiteKeyColor);
  const darkerWhiteKeyColorPressed = darken(0.6, whiteKeyColorPressed);

  // If isExampleOn is true, always apply pressed state styles
  const isPressed = props.isExampleOn || (Array.isArray(props.activeKeys) && props.activeKeys.some(activeKey => activeKey.note === props.noteOctave && activeKey.isActive));

  let keyStyle = {
    background: props.whiteKeyShadow
      ? `linear-gradient(220deg, ${darkerWhiteKeyColor} 1%, ${whiteKeyColor} 99%)`
      : whiteKeyColor,
  };

  if (isPressed) {
    keyStyle = {
      background: props.whiteKeyShadow
        ? `linear-gradient(220deg, ${darkerWhiteKeyColorPressed} 1%, ${whiteKeyColorPressed} 99%)`
        : whiteKeyColorPressed,
    };
  }

  return (
    <div className="white-key" style={keyStyle}>
      <>
        {props.whiteKeyNoteMarker && props.noteOctave}
      </>
    </div>
  );
};

export default WhiteKey;
