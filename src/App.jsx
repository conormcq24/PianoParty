import { useState } from 'react'
import { SettingsProvider } from './common/context/settingsContext/settingsContext';
import { NoteActivityProvider } from './common/context/noteActivityContext/noteActivityContext'
import { ControlProvider } from './common/context/controlContext/controlContext'
import PianoPartyScreen from './common/modes/pianoParty/index';
import './App.css'

function App() {

  return (
    <>
        <SettingsProvider>
            <NoteActivityProvider>
                <ControlProvider>
                    <PianoPartyScreen />
                </ControlProvider>
            </NoteActivityProvider>
        </SettingsProvider >
    </>
  )
}

export default App
