import React, { useState, useEffect } from 'react';
import { WebMidi } from 'webmidi';
import Navbar from '../../components/navbar/index';
import Screen from '../../components/screen/index';
import Controls from '../../components/controls/index';
import Settings from '../../components/settings/index';
import MusicScreen from '../../components/musicScreen/index';
import noteActivityData from './util/noteActivityData'; // Import the initial note data

import './style/styles.css';

const ScreenContainer = (props) => {
  // Initialize the state with the imported noteActivityData
  const [noteActivity, setNoteActivity] = useState(noteActivityData);

  useEffect(() => {
    /* enables WebMidi */
    WebMidi.enable((err) => {
      if (err) {
        console.error("WebMidi could not be enabled.", err);
      } else {
        console.log("Connected MIDI devices:", WebMidi.inputs);

        /* Add listeners for key presses and releases on each MIDI input device */
        WebMidi.inputs.forEach((input) => {

          /* listen for notes being pressed */
          input.addListener('noteon', "all", (e) => {
            const noteName = `${e.note.name}${e.note.accidental || ""}${e.note.octave}`;
            setNoteActivity(prevActivity =>
              prevActivity.map((noteObj) =>
                noteObj.note === noteName ? { ...noteObj, isActive: true } : noteObj
              )
            );
          });

          /* listen for notes being released */
          input.addListener('noteoff', "all", (e) => {
            const noteName = `${e.note.name}${e.note.accidental || ""}${e.note.octave}`;
            setNoteActivity(prevActivity =>
              prevActivity.map((noteObj) =>
                noteObj.note === noteName ? { ...noteObj, isActive: false } : noteObj
              )
            );
          });

        });

        /* listen for connections */
        WebMidi.addListener('connected', (e) => {
          console.log("MIDI device connected:", e.port.name);
        });

        /* listen for disconnections */
        WebMidi.addListener('disconnected', (e) => {
          console.log("MIDI device disconnected:", e.port.name);
        });
      }
    });

    // Cleanup listeners when component unmounts
    return () => {
      WebMidi.inputs.forEach((input) => {
        input.removeListener('noteon', "all");
        input.removeListener('noteoff', "all");
      });
    };
  }, []);  // Empty dependency array ensures this runs only once when the component is mounted

  return (
    <>
      <Navbar />
      <Screen activeKeys={noteActivity} />
      <Controls />
      <Settings showSettings={false} />
      <MusicScreen showMusicScreen={false} />
    </>
  );
};

export default ScreenContainer;
