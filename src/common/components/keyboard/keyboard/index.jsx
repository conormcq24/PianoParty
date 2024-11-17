import React from 'react';
import WhiteKey from '../whiteKey/index';
import BlackKey from '../blackKey/index';
import './style/styles.css';

const Keyboard = (props) => {

  const keyCount = 52;  // Number of keys to render
  const musicalNotes = ["A", "B", "C", "D", "E", "F", "G"];

  /* programmatically assign musical notes to white keys */
  const getWhiteNote = (index) => {
      /* octave should equal index / 7 because octave shifts every 7 notes */
      let octave = Math.floor(index / 7);
      /* find the note associated with the index */
      const note = musicalNotes[index % 7];
      /* increment octave by 1 in these cases because of weird way musical notes operate */
      if(note === "C" || note === "D" || note === "E" || note === "F" || note === "G")
      {
          octave = octave + 1;
      }
      return `${note}${octave}`;
  };

  /* programmatically assign musical notes to black keys */
  const getBlackNote = (index) => {
      /* octave should equal index / 7 because octave shifts every 7 notes */
      let octave = Math.floor(index / 7);
      /* find the note associated with the index */
      const note = musicalNotes[index % 7];
      /* increment octave by 1 in these cases because of weird way musical notes operate */
      if(note === "C" || note === "D" || note === "E" || note === "F" || note === "G")
      {
          octave = octave + 1;
      }
      return `${note}${"#"}${octave}`;
  }

  return (
    <div className="keyboard">
        <div className="white-key-grouping">
            {Array.from({ length: keyCount }).map((_, index) => (
                <WhiteKey key={index} noteOctave={getWhiteNote(index)}/>
            ))}
        </div>
        <div className="black-key-grouping">
            {Array.from({ length: keyCount }).map((_, index) => (
                <BlackKey key={index} noteOctave={getBlackNote(index)}/>
            ))}
        </div>
    </div>
  );
};

export default Keyboard;
