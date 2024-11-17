import React, { useState, useEffect, useContext, useRef } from 'react';
import { playSound, stopSound } from '../../context/noteActivityContext/util/soundHandler.js';
/* Components */
import Navbar from '../../components/bars/navbar/index';
import PianoPartyScreen from '../../components/gameScreens/pianoPartyScreen/index';
import Controls from '../../components/bars/controls/index';
import Settings from '../../components/settings/settings/index';
import MusicScreen from '../../components/gameScreens/musicScreen/index';
/* Context */
import { NoteActivityContext } from '../../context/noteActivityContext/noteActivityContext';
import { ControlContext } from '../../context/controlContext/controlContext';
import noteActivityData from '../../context/noteActivityContext/util/noteActivityData.js';


const PianoParty = (props) => {
  /* Access noteActivity and setNoteActivity from the NoteActivityContext */
  const { noteActivity, setNoteActivity } = useContext(NoteActivityContext);
  /* Access control context */
  const { pianoConnected, setPianoConnected, mute } = useContext(ControlContext);
  /* Tracks input devices that already have listeners attached */
  const attachedListeners = useRef(new Set());
  /* Use a ref to track the latest value of mute without causing re-renders */
  const muteRef = useRef(mute);

  /* use effect for mute */
  useEffect(() => {
    /* Update the ref to keep track of the latest value of mute */
    muteRef.current = mute;
  }, [mute]);

  /* use effect for piano status */
  useEffect(() => {
    /* declare blank cleanup */
    let cleanup = null;

    const handleMidiStateChange = (event) => {
      /* listen for connecting and disconnecting midi devices */
      if (event.port.state === "connected") {
        console.log("MIDI device connected: ", event.port.name);
        setPianoConnected(true); // Update the state when a device is connected
      } else if (event.port.state === "disconnected") {
        console.log("MIDI device disconnected: ", event.port.name);
        setPianoConnected(false); // Update the state when a device is disconnected
      }
    };

    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then((midiAccess) => {
        /* if access is granted follow this path */
        midiAccess.onstatechange = handleMidiStateChange;

        /* control piano connection indicator */
        const inputs = Array.from(midiAccess.inputs.values());
        if (inputs.length > 0) {
          setPianoConnected(true); // Set pianoConnected if devices are present
        } else {
          setPianoConnected(false); // Set it to false if no devices are found
        }

        /* function to remove listeners */
        cleanup = () => {
          midiAccess.onstatechange = null;
        };
      }).catch((error) => {
        console.error("MIDI access failed", error);
      });
    }

    /* run cleanup on unmount */
    return () => {
      if (cleanup) cleanup();
    };
  }, [setPianoConnected]);

  /* use effect for note handler */
  useEffect(() => {
    /* declare a blank cleanup variable */
    let cleanup = null;

    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then((midiAccess) => {
        /* this logic happens if access is granted */

        /* Convert the collection of input devices into an array */
        const inputs = Array.from(midiAccess.inputs.values());

        /* for each input device */
        inputs.forEach((input) => {
          /* Check if a listener is already attached to this input device by its ID */
          if (!attachedListeners.current.has(input.id)) {

            /* Attach a listener for MIDI messages if not already attached */
            input.onmidimessage = (message) => {
              const [status, noteNumber] = message.data;
              const keyOn = 144;
              if (status === keyOn) {
                handleKeyPress(noteNumber);
              } else {
                handleKeyRelease(noteNumber);
              }
            };

            /* Add the input device ID to the set of attached listeners */
            attachedListeners.current.add(input.id);
          }
        });

        /* Detach MIDI message listeners and clear the set of attached listeners */
        cleanup = () => {
          inputs.forEach((input) => {
            input.onmidimessage = null;
          });
          /* clear all ids from attachedListeners */
          attachedListeners.current.clear();
        };
      }).catch((error) => {
        console.error("MIDI access failed", error);
      });
    }

    /* Run cleanup to remove listeners when the component unmounts or dependencies change */
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const handleKeyPress = (noteNumber) => {
    const noteData = noteActivityData.find(note => note.noteNum === noteNumber);

    if (noteData) {
      if (muteRef.current) {
        setNoteActivity(prevNoteActivity =>
          prevNoteActivity.map(note =>
            note.noteNum === noteNumber ? { ...note, isActive: true } : note
          )
        );
      } else {
        const { note, frequency } = noteData;
        const isActive = true;
        playSound(note, isActive, frequency, muteRef.current);
        setNoteActivity(prevNoteActivity =>
          prevNoteActivity.map(note =>
            note.noteNum === noteNumber ? { ...note, isActive: true } : note
          )
        );
      }
    }
  };

  const handleKeyRelease = (noteNumber) => {
    const noteData = noteActivityData.find(note => note.noteNum === noteNumber);

    if (noteData) {
      const { note } = noteData;
      stopSound(note);
      setNoteActivity(prevNoteActivity =>
        prevNoteActivity.map(note =>
          note.noteNum === noteNumber ? { ...note, isActive: false } : note
        )
      );
    }
  };

  return (
    <>
      <Navbar />
      <PianoPartyScreen activeKeys={noteActivity} />
      <Controls />
      <Settings />
      <MusicScreen showMusicScreen={false} />
    </>
  );
};

export default PianoParty;
