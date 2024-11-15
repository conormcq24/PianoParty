import React, { createContext, useState } from "react";

export const ControlContext = createContext();

export const ControlProvider = ({ children }) => {
  const [pianoConnected, setPianoConnected] = useState(false);
  const [mute, setMute] = useState(true);

  const toggleMute = () => {
    setMute(prevState => {
      return !prevState;
    });
  };


  return (
    <ControlContext.Provider
        value={{
            setPianoConnected,
            toggleMute,
            pianoConnected,
            mute,
        }}>
      {children}
    </ControlContext.Provider>
  );
};
