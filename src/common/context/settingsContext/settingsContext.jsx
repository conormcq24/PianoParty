import React, { createContext, useState } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [whiteKeyShadow, setWhiteKeyShadow] = useState(true);
  const [whiteKeyNoteMarker, setWhiteKeyNoteMarker] = useState(true);
  const [whiteKeyColor, setWhiteKeyColor] = useState("#FFFFFF");
  const [whiteKeyColorPressed, setWhiteKeyColorPressed] = useState("palegreen");
  const [showSettings, setShowSettings] = useState(false);

  const toggleWhiteKeyShadow = () => {
    setWhiteKeyShadow((prev) => !prev);
  };

  const toggleWhiteNoteMarker = () => {
    setWhiteKeyNoteMarker((prev) => !prev);
  };

  const toggleSettings = () => {
    setShowSettings(prevState => !prevState);
  };

  return (
    <SettingsContext.Provider
      value={{
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
        toggleSettings,
        showSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
