import React, { useContext } from 'react';
import { SettingsContext } from '../../context/settingsContext/settingsContext';
import { NoteActivityContext } from '../../context/noteActivityContext/noteActivityContext';
import { darken } from 'polished';
import { mix } from 'polished';

import './style/styles.css';

const BlackKey = (props) => {
  // Check if the note should be hidden based on the given conditions
  const shouldHide = /[BE]/i.test(props.noteOctave) || props.noteOctave === "C#8";

  const {
      blackKeyShadow: globalBlackKeyShadow,
      blackKeyColor,
      blackKeyColorPressed,
      blackKeyNoteMarker: globalBlackKeyNoteMarker,
  } = useContext(SettingsContext);  // Access settings from context

  // Consume note activity data from NoteActivityContext
  const { noteActivity } = useContext(NoteActivityContext);  // Access note activity from context

  // Default props and context values
  const defaultBlackKeyShadow = props.blackKeyShadow !== undefined ? props.blackKeyShadow : globalBlackKeyShadow;
  const defaultBlackKeyNoteMarker = props.blackKeyNoteMarker !== undefined ? props.blackKeyNoteMarker : globalBlackKeyNoteMarker;

  // Default colors and other settings
  const defaultBlackKeyColor = props.blackKeyColor || blackKeyColor || "#000000";
  const defaultBlackKeyColorPressed = props.blackKeyColorPressed || blackKeyColorPressed || "darkgreen";

  // Apply the darken function to create darker shades for the key colors
  const darkerBlackKeyColor = darken(1, defaultBlackKeyColor);
  const darkerBlackKeyColorPressed = darken(1, defaultBlackKeyColorPressed);
  const blendedColor = mix(0.5, darkerBlackKeyColor, defaultBlackKeyColor);
  const blendedColorPressed = mix(0.5, darkerBlackKeyColorPressed, defaultBlackKeyColorPressed);

  // Check if the current key is pressed based on the noteActivity data
  const isPressed = props.isExampleOn || noteActivity.some(activeKey =>
    activeKey.note === props.noteOctave && activeKey.isActive
  );

  // Apply the styles based on whether the key is pressed or not
  let keyStyle = {
    background: defaultBlackKeyShadow
        ? `linear-gradient(180deg, ${darkerBlackKeyColor} 10%, ${blendedColor} 30%, ${defaultBlackKeyColor} 60%)`
        : defaultBlackKeyColor,
  };

  if (isPressed) {
    keyStyle = {
        background: defaultBlackKeyShadow
          ? `linear-gradient(180deg, ${darkerBlackKeyColorPressed} 10%, ${blendedColorPressed} 30%, ${defaultBlackKeyColorPressed} 60%)`
          : defaultBlackKeyColorPressed,
    };
  }

  return (
    <div className={`black-key-space ${shouldHide ? 'hidden' : ''}`}>
        <div className="black-key" style={keyStyle}>
            {defaultBlackKeyNoteMarker && props.noteOctave}
        </div>
    </div>
  );
};

export default BlackKey;
