import React from 'react';
import BlackKey from '../BlackKey/index';
import WhiteKey from '../WhiteKey/index';
import './style/styles.css';

const WhiteKeyGroup = (props) => {
  const keyCount = 7;  /* There are 7 white keys per group (A-G) */

  /* calculate octave and note for white keys */
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

    /* for indexes less than two use octave */
    if (index < 2) {
      return `${numNoteMap[index].note}${octave}`; // e.g., "A3" or "B3"
    }

    /* for indexes greater than two use octave + 1 */
    return `${numNoteMap[index].note}${octave + 1}`; // e.g., "C4" or "D4"
  };

  /* calculate octave and note for white keys */
  const getBlackKeyOctave = (index, octave) => {
      const numNoteMap = [
        { note: "A#", num: 0 },
        { note: "B#", num: 1 },
        { note: "C#", num: 2 },
        { note: "D#", num: 3 },
        { note: "E#", num: 4 },
        { note: "F#", num: 5 },
        { note: "G#", num: 6 },
      ];

      /* for indexes less than two use octave */
      if (index < 2) {
        return `${numNoteMap[index].note}${octave}`; // e.g., "A3" or "B3"
      }

      /* for indexes greater than two use octave + 1 */
      return `${numNoteMap[index].note}${octave + 1}`; // e.g., "C4" or "D4"
  };
  /* we generate 7 black keys per group but only 5 should be visible, this logic dictates which to hide */
  const getBlackKeyStyle = (index) => {
    if (props.hideAllButFirstBlackKey) {
      return index === 0 ? {} : { opacity: 0 };
    }
    return index === 1 || index === 4 ? { opacity: 0 } : {};
  };

  return (
    <div className="white-key-group">
      {/* Render 7 white keys per group, passing the correct octave and note */}
      {Array.from({ length: keyCount }).map((_, index) => (
        <WhiteKey
          key={index}
          noteOctave={getWhiteKeyOctave(index, props.octave)}  // Pass the correct octave and note
        />
      ))}
      <div className="black-key-group">
        {/* Render 7 black keys with conditional styling */}
        {Array.from({ length: keyCount }).map((_, index) => (
          <BlackKey
            key={index}
            style={getBlackKeyStyle(index)}
            activeKeys={props.activeKeys}
            noteOctave={getBlackKeyOctave(index, props.octave)}
          />
        ))}
      </div>
    </div>
  );
};

export default WhiteKeyGroup;
