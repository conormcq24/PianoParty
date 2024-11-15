import React, { useState, useEffect } from 'react';
import { WebMidi } from 'webmidi';

/* components */
import Navbar from '../../components/navbar/index';
import Screen from '../../components/screen/index';
import Controls from '../../components/controls/index';
import Settings from '../../components/settings/index';
import MusicScreen from '../../components/musicScreen/index';

/* this holds information related to notes like their sounds and activity */
import noteActivityData from './util/noteActivityData';

import './style/styles.css';

const ScreenContainer = (props) => {
  /* main state */
  const [noteActivity, setNoteActivity] = useState(noteActivityData);
  const [showSettings, setShowSettings] = useState(false);
  const [pianoConnected, setPianoConnected] = useState(false);

  /* white key settings */
  const [whiteKeyShadow, setWhiteKeyShadow] = useState(true);
  const [whiteKeyNoteMarker, setWhiteKeyNoteMarker] = useState(true);
  const [whiteKeyColor, setWhiteKeyColor] = useState("#FFFFFF");
  const [whiteKeyColorPressed, setWhiteKeyColorPressed] = useState("palegreen");

  const toggleWhiteKeyShadow = () => {
    setWhiteKeyShadow(prevShadow => !prevShadow);
  };

  const toggleWhiteNoteMarker = () => {
    setWhiteKeyNoteMarker(prevNoteMarker => !prevNoteMarker);
  };

  const toggleSettings = () => {
    setShowSettings(prevState => !prevState);
  };



  console.log("MAIN LEVEL", whiteKeyShadow);
  useEffect(() => {
    /* Check if WebMidi is supported by the browser */
    if (navigator.requestMIDIAccess) {
      WebMidi.enable((err) => {
        if (err) {
          console.error("WebMidi could not be enabled.", err);
        } else {
          console.log("Connected MIDI devices:", WebMidi.inputs);

          /* Set initial state based on connected MIDI devices */
          setPianoConnected(WebMidi.inputs.length > 0);

          /* Add listeners for key presses and releases on each MIDI input device */
          WebMidi.inputs.forEach((input) => {
            input.addListener('noteon', "all", (e) => {
              const noteName = `${e.note.name}${e.note.accidental || ""}${e.note.octave}`;
              const noteData = noteActivity.find((note) => note.note === noteName);
              if (noteData) {
                setNoteActivity(prevActivity =>
                  prevActivity.map((noteObj) =>
                    noteObj.note === noteName ? { ...noteObj, isActive: true } : noteObj
                  )
                );
              }
            });

            input.addListener('noteoff', "all", (e) => {
              const noteName = `${e.note.name}${e.note.accidental || ""}${e.note.octave}`;
              setNoteActivity(prevActivity =>
                prevActivity.map((noteObj) =>
                  noteObj.note === noteName ? { ...noteObj, isActive: false } : noteObj
                )
              );
            });
          });

          /* Listen for connections */
          WebMidi.addListener('connected', (e) => {
            console.log("MIDI device connected:", e.port.name);
            setPianoConnected(true);
          });

          /* Listen for disconnections */
          WebMidi.addListener('disconnected', (e) => {
            console.log("MIDI device disconnected:", e.port.name);
            setPianoConnected(false);
          });
        }
      });

      // Set up a periodic check every 5 seconds
      const interval = setInterval(() => {
        const hasMidiDevice = WebMidi.inputs.length > 0;
        if (hasMidiDevice !== pianoConnected) {
          setPianoConnected(hasMidiDevice);
        }
      }, 5000); // Check every 5 seconds

      // Cleanup the interval when the component unmounts
      return () => {
        clearInterval(interval);
        WebMidi.inputs.forEach((input) => {
          input.removeListener('noteon', "all");
          input.removeListener('noteoff', "all");
        });
      };

    } else {
      console.error("WebMidi is not supported on this browser.");
    }
  },
  /* if these variables are changed, trigger useEffect logic */
  [pianoConnected, noteActivity]);

  return (
    <>
      <Navbar toggleSettings={toggleSettings} />
      <Screen
        activeKeys={noteActivity}
        whiteKeyShadow={whiteKeyShadow}
        whiteKeyNoteMarker={whiteKeyNoteMarker}
        whiteKeyColor={whiteKeyColor}
        whiteKeyColorPressed={whiteKeyColorPressed}
      />
      <Controls pianoConnected={pianoConnected} />
      <Settings
        showSettings={showSettings}
        setWhiteKeyShadow={setWhiteKeyShadow}
        setWhiteKeyColor={setWhiteKeyColor}
        setWhiteKeyColorPressed={setWhiteKeyColorPressed}
        setWhiteKeyNoteMarker={setWhiteKeyNoteMarker}
        whiteKeyShadow={whiteKeyShadow}
        whiteKeyColor={whiteKeyColor}
        whiteKeyColorPressed={whiteKeyColorPressed}
        whiteKeyNoteMarker={whiteKeyNoteMarker}
      />
      <MusicScreen showMusicScreen={false} />
    </>
  );
};

export default ScreenContainer;
