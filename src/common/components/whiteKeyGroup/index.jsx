import React from 'react';
import BlackKey from '../BlackKey/index';
import WhiteKey from '../WhiteKey/index';  // Import the WhiteKey component
import './style/styles.css';

const WhiteKeyGroup = (props) => {
  const keyCount = 7;  // There are 7 white keys per group (A-G)

  // Calculate the octave for each white key
  const getWhiteKeyOctave = (index, octave) => {
    const numNoteMap = [
      { note: "A", num: 0 },
      { note: "B", num: 1 },
      { note: "C", num: 2 },
      { note: "D", num: 3 },
      { note: "E", num: 4 },
      { note: "F", num: 5 },
      { note: "G", num: 6 },
    ];

    // For indices less than 2, return the note with the current octave
    if (index < 2) {
      return `${numNoteMap[index].note}${octave}`; // e.g., "A3" or "B3"
    }

    // For indices 2 or greater, return the note with octave + 1
    return `${numNoteMap[index].note}${octave + 1}`; // e.g., "C4" or "D4"
  };

  // Determine the opacity for black keys based on the hideAllButFirstBlackKey prop
  const getBlackKeyStyle = (index) => {
    if (props.hideAllButFirstBlackKey) {
      return index === 0 ? {} : { opacity: 0 };  // Only show the first black key
    }
    return index === 1 || index === 4 ? { opacity: 0 } : {};  // Hide 2nd and 5th black keys by default
  };

  return (
    <div className="white-key-group">
      {/* Render 7 white keys per group, passing the correct octave and note */}
      {Array.from({ length: keyCount }).map((_, index) => (
        <WhiteKey
          key={index}
          activeKeys={props.activeKeys}
          noteOctave={getWhiteKeyOctave(index, props.octave)}  // Pass the correct octave and note
        />
      ))}
      <div className="black-key-group">
        {/* Render 7 black keys with conditional styling */}
        {Array.from({ length: keyCount }).map((_, index) => (
          <BlackKey
            key={index}
            style={getBlackKeyStyle(index)}  // Apply styles for black keys
          />
        ))}
      </div>
    </div>
  );
};

export default WhiteKeyGroup;
