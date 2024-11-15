import React, { createContext, useState } from "react";
import noteActivityData from './util/noteActivityData.js';

export const NoteActivityContext = createContext();

export const NoteActivityProvider = ({ children }) => {
  const [noteActivity, setNoteActivity] = useState(noteActivityData);

  return (
    <NoteActivityContext.Provider value={{ noteActivity, setNoteActivity }}>
      {children}
    </NoteActivityContext.Provider>
  );
};
