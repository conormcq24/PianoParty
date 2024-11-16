import React, { createContext, useState } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {

  /* general setting state */
  const [showSettings, setShowSettings] = useState(false);

  /* general state functions */
  const toggleSettings = () => {
      setShowSettings(prevState => !prevState);
    };

  /* white key state */
  const [whiteKeyShadow, setWhiteKeyShadow] = useState(true);
  const [whiteKeyNoteMarker, setWhiteKeyNoteMarker] = useState(true);
  const [whiteKeyColor, setWhiteKeyColor] = useState("#FFFFFF");
  const [whiteKeyColorPressed, setWhiteKeyColorPressed] = useState("palegreen");

  /* white key functions */
  const toggleWhiteKeyShadow = () => {
    setWhiteKeyShadow((prev) => !prev);
  };
  const toggleWhiteNoteMarker = () => {
    setWhiteKeyNoteMarker((prev) => !prev);
  };

  /* black key state */
  const [blackKeyShadow, setBlackKeyShadow] = useState(true);
  const [blackKeyNoteMarker, setBlackKeyNoteMarker] = useState(true);
  const [blackKeyColor, setBlackKeyColor] = useState("#000000");
  const [blackKeyColorPressed, setBlackKeyColorPressed] = useState("darkgreen");

  /* black key functions */
  const toggleBlackKeyShadow = () => {
      setBlackKeyShadow((prev) => !prev);
    };
    const toggleBlackNoteMarker = () => {
      setBlackKeyNoteMarker((prev) => !prev);
    };

  return (
    <SettingsContext.Provider
      value={{
        /* general settings */
        showSettings,
        toggleSettings,

        /* white key settings */
        whiteKeyShadow,
        setWhiteKeyShadow,
        toggleWhiteKeyShadow,
        whiteKeyNoteMarker,
        setWhiteKeyNoteMarker,
        toggleWhiteNoteMarker,
        whiteKeyColor,
        setWhiteKeyColor,
        whiteKeyColorPressed,
        setWhiteKeyColorPressed,

        /* black key settings */
        blackKeyShadow,
        setBlackKeyShadow,
        toggleBlackKeyShadow,
        blackKeyNoteMarker,
        setBlackKeyNoteMarker,
        toggleBlackNoteMarker,
        blackKeyColor,
        setBlackKeyColor,
        blackKeyColorPressed,
        setBlackKeyColorPressed,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
