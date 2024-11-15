import React, { useContext } from 'react';
import { darken } from 'polished';
import { SettingsContext } from '../../context/settingsContext/settingsContext';
import { NoteActivityContext } from '../../context/noteActivityContext/noteActivityContext';
import './style/styles.css';

const WhiteKey = (props) => {
  // Consume relevant settings from the SettingsContext
  const {
    whiteKeyShadow: globalWhiteKeyShadow,
    whiteKeyColor,
    whiteKeyColorPressed,
    whiteKeyNoteMarker: globalWhiteKeyNoteMarker,
  } = useContext(SettingsContext);  // Access settings from context

  // Consume note activity data from NoteActivityContext
  const { noteActivity } = useContext(NoteActivityContext);  // Access note activity from context

  /*
    Use props if provided, otherwise fall back to context
  */
  const defaultWhiteKeyShadow = props.whiteKeyShadow !== undefined ? props.whiteKeyShadow : globalWhiteKeyShadow;
  const defaultWhiteKeyNoteMarker = props.whiteKeyNoteMarker !== undefined ? props.whiteKeyNoteMarker : globalWhiteKeyNoteMarker;

  // Default colors and other settings
  const defaultWhiteKeyColor = props.whiteKeyColor || whiteKeyColor || "#FFFFFF";
  const defaultWhiteKeyColorPressed = props.whiteKeyColorPressed || whiteKeyColorPressed || "palegreen";

  // Apply the darken function to create darker shades for the key colors
  const darkerWhiteKeyColor = darken(0.6, defaultWhiteKeyColor);
  const darkerWhiteKeyColorPressed = darken(0.6, defaultWhiteKeyColorPressed);

  // Check if the current key is pressed based on the noteActivity data
  const isPressed = noteActivity.some(activeKey =>
    activeKey.note === props.noteOctave && activeKey.isActive
  );

  // Apply the styles based on whether the key is pressed or not
  let keyStyle = {
    background: defaultWhiteKeyShadow
      ? `linear-gradient(220deg, ${darkerWhiteKeyColor} 1%, ${defaultWhiteKeyColor} 99%)`
      : defaultWhiteKeyColor,
  };

  if (isPressed) {
    keyStyle = {
      background: defaultWhiteKeyShadow
        ? `linear-gradient(220deg, ${darkerWhiteKeyColorPressed} 1%, ${defaultWhiteKeyColorPressed} 99%)`
        : defaultWhiteKeyColorPressed,
    };
  }

  return (
    <div className="white-key" style={keyStyle}>
      <>
        {defaultWhiteKeyNoteMarker && props.noteOctave}
      </>
    </div>
  );
};

export default WhiteKey;
