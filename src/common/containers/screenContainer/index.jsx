import React, { useState, useEffect, useContext } from 'react';
import { WebMidi } from 'webmidi';
import { playSound, stopSound } from '../../context/noteActivityContext/util/soundHandler.js';

/* components */
import Navbar from '../../components/navbar/index';
import Screen from '../../components/screen/index';
import Controls from '../../components/controls/index';
import Settings from '../../components/settings/index';
import MusicScreen from '../../components/musicScreen/index';

/* Context */
import { NoteActivityContext } from '../../context/noteActivityContext/noteActivityContext';
import { ControlContext } from '../../context/controlContext/controlContext';

import './style/styles.css';

const ScreenContainer = (props) => {
  /* Access noteActivity and setNoteActivity from the NoteActivityContext */
  const { noteActivity, setNoteActivity } = useContext(NoteActivityContext);
  /* Access control context */
  const { pianoConnected, setPianoConnected, mute } = useContext(ControlContext);

  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      WebMidi.enable((err) => {
        if (err) {
          console.error("WebMidi could not be enabled.", err);
        } else {
          console.log("Connected MIDI devices:", WebMidi.inputs);

          // Set initial state based on connected MIDI devices
          setPianoConnected(WebMidi.inputs.length > 0);

          WebMidi.inputs.forEach((input) => {
            // Remove existing listeners before adding new ones to avoid duplicates
            input.removeListener('noteon', "all");
            input.removeListener('noteoff', "all");

            // Add listeners for key presses and releases
            input.addListener('noteon', "all", (e) => {
              const noteName = `${e.note.name}${e.note.accidental || ""}${e.note.octave}`;
              const noteData = noteActivity.find((note) => note.note === noteName);
              if (noteData) {
                setNoteActivity((prevActivity) =>
                  prevActivity.map((noteObj) =>
                    noteObj.note === noteName ? { ...noteObj, isActive: true } : noteObj
                  )
                );

                if (!mute) {
                  playSound(noteName, true, noteData.frequency, mute);
                  console.log("MUTE IS OFF IN SCREENCONTAINER: PLAY NOTE");
                } else {
                  console.log("MUTE IS ON IN SCREENCONTAINER: DONT PLAY NOTE");
                }
              }
            });

            input.addListener('noteoff', "all", (e) => {
              const noteName = `${e.note.name}${e.note.accidental || ""}${e.note.octave}`;
              setNoteActivity((prevActivity) =>
                prevActivity.map((noteObj) =>
                  noteObj.note === noteName ? { ...noteObj, isActive: false } : noteObj
                )
              );
              stopSound(noteName); // Stop the sound when the note is released
            });
          });

          // Listen for connections and disconnections
          WebMidi.addListener('connected', (e) => {
            console.log("MIDI device connected:", e.port.name);
            setPianoConnected(true);
          });

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
  }, [pianoConnected, noteActivity, setNoteActivity, mute]);


  return (
    <>
      <Navbar />
      <Screen activeKeys={noteActivity} />
      <Controls />
      <Settings />
      <MusicScreen showMusicScreen={false} />
    </>
  );
};

export default ScreenContainer;