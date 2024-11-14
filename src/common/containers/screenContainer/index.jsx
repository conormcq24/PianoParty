import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/index';
import Screen from '../../components/screen/index';
import Controls from '../../components/controls/index';
import Settings from '../../components/settings/index';
import MusicScreen from '../../components/musicScreen/index';
import './style/styles.css';

const ScreenContainer = (props) => {
  const [midiConnected, setMidiConnected] = useState(false);  // State to track if MIDI is connected
  const [midiMessage, setMidiMessage] = useState('');  // State to display the connection status message
  const [activeKeys, setActiveKeys] = useState([]);  // State to store active keys

  const noteNumToKey = [
      { note: 21, key: "A0" },
      { note: 22, key: "A#0" },
      { note: 23, key: "B0" },
      { note: 24, key: "C1" },
      { note: 25, key: "C#1" },
      { note: 26, key: "D1" },
      { note: 27, key: "D#1" },
      { note: 28, key: "E1" },
      { note: 29, key: "F1" },
      { note: 30, key: "F#1" },
      { note: 31, key: "G1" },
      { note: 32, key: "G#1" },
      { note: 33, key: "A1" },
      { note: 34, key: "A#1" },
      { note: 35, key: "B1" },
      { note: 36, key: "C2" },
      { note: 37, key: "C#2" },
      { note: 38, key: "D2" },
      { note: 39, key: "D#2" },
      { note: 40, key: "E2" },
      { note: 41, key: "F2" },
      { note: 42, key: "F#2" },
      { note: 43, key: "G2" },
      { note: 44, key: "G#2" },
      { note: 45, key: "A2" },
      { note: 46, key: "A#2" },
      { note: 47, key: "B2" },
      { note: 48, key: "C3" },
      { note: 49, key: "C#3" },
      { note: 50, key: "D3" },
      { note: 51, key: "D#3" },
      { note: 52, key: "E3" },
      { note: 53, key: "F3" },
      { note: 54, key: "F#3" },
      { note: 55, key: "G3" },
      { note: 56, key: "G#3" },
      { note: 57, key: "A3" },
      { note: 58, key: "A#3" },
      { note: 59, key: "B3" },
      { note: 60, key: "C4" },
      { note: 61, key: "C#4" },
      { note: 62, key: "D4" },
      { note: 63, key: "D#4" },
      { note: 64, key: "E4" },
      { note: 65, key: "F4" },
      { note: 66, key: "F#4" },
      { note: 67, key: "G4" },
      { note: 68, key: "G#4" },
      { note: 69, key: "A4" },
      { note: 70, key: "A#4" },
      { note: 71, key: "B4" },
      { note: 72, key: "C5" },
      { note: 73, key: "C#5" },
      { note: 74, key: "D5" },
      { note: 75, key: "D#5" },
      { note: 76, key: "E5" },
      { note: 77, key: "F5" },
      { note: 78, key: "F#5" },
      { note: 79, key: "G5" },
      { note: 80, key: "G#5" },
      { note: 81, key: "A5" },
      { note: 82, key: "A#5" },
      { note: 83, key: "B5" },
      { note: 84, key: "C6" },
      { note: 85, key: "C#6" },
      { note: 86, key: "D6" },
      { note: 87, key: "D#6" },
      { note: 88, key: "E6" },
      { note: 89, key: "F6" },
      { note: 90, key: "F#6" },
      { note: 91, key: "G6" },
      { note: 92, key: "G#6" },
      { note: 93, key: "A6" },
      { note: 94, key: "A#6" },
      { note: 95, key: "B6" },
      { note: 96, key: "C7" },
      { note: 97, key: "C#7" },
      { note: 98, key: "D7" },
      { note: 99, key: "D#7" },
      { note: 100, key: "E7" },
      { note: 101, key: "F7" },
      { note: 102, key: "F#7" },
      { note: 103, key: "G7" },
      { note: 104, key: "G#7" },
      { note: 105, key: "A7" },
      { note: 106, key: "A#7" },
      { note: 107, key: "B7" },
      { note: 108, key: "C8" }
  ];


  // Function to translate MIDI note number to piano key (e.g., A0, C#4)
  const getPianoKey = (midiNote) => {
    console.log(midiNote);
    const note = noteNumToKey.find(item => item.note === midiNote);
    return note ? note.key : 'Unknown';
  };

  // Function to handle MIDI messages (key presses, releases, etc.)
  const handleMidiMessage = (event) => {
    const [status, data1, data2] = event.data; // status, note (data1), velocity (data2)
    const note = data1;
    const velocity = data2;

    // Translate MIDI note to piano key using the lookup table
    const pianoNote = getPianoKey(note);

    if (status === 144 && velocity > 0) {
      // Note on (key press)
      setActiveKeys(prevKeys => {
        // Add the new key if it's not already in the active keys
        const newKeys = prevKeys.some(key => key.key === pianoNote)
          ? prevKeys // If key is already active, leave unchanged
          : [...prevKeys, { key: pianoNote, isActive: true }];
        return newKeys;
      });
    } else if (status === 128 || (status === 144 && velocity === 0)) {
      // Note off (key release)
      setActiveKeys(prevKeys => {
        // Remove the key that was released from the active keys
        const updatedKeys = prevKeys.filter(key => key.key !== pianoNote);
        return updatedKeys;
      });
    }
  };


  useEffect(() => {
    // Function to detect MIDI devices and listen to MIDI input events
    const detectMidi = async () => {
      if (navigator.requestMIDIAccess) {
        try {
          const midiAccess = await navigator.requestMIDIAccess();
          const inputs = midiAccess.inputs;

          // Check if there are any MIDI input devices connected
          if (inputs.size > 0) {
            setMidiConnected(true);
            setMidiMessage('MIDI keyboard is plugged in.');

            // Listen for MIDI input events
            inputs.forEach(input => {
              input.onmidimessage = handleMidiMessage;
            });
          } else {
            setMidiConnected(false);
            setMidiMessage('No MIDI devices detected.');
          }
        } catch (error) {
          console.error('MIDI Error:', error);
          setMidiConnected(false);
          setMidiMessage('MIDI API not supported or error occurred.');
        }
      } else {
        setMidiConnected(false);
        setMidiMessage('Web MIDI API is not supported in this browser.');
      }
    };

    // Detect MIDI connection when component mounts
    detectMidi();

    // Cleanup function: stop listening for MIDI input
    return () => {
      if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(midiAccess => {
          midiAccess.inputs.forEach(input => {
            input.onmidimessage = null;  // Stop listening for messages
          });
        });
      }
    };
  }, []); // Empty array means this runs once when the component mounts


  return (
    <>
      <Navbar />
      <Screen activeKeys={activeKeys} />
      <Controls />
      <Settings showSettings={false} />
      <MusicScreen showMusicScreen={false} />
    </>
  );
};

export default ScreenContainer;
