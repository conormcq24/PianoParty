import { useState } from 'react'
import { SettingsProvider } from './common/context/settingsContext/settingsContext';
import { NoteActivityProvider } from './common/context/noteActivityContext/noteActivityContext'
import { ControlProvider } from './common/context/controlContext/controlContext'
import ScreenContainer from './common/containers/screenContainer/index';
import './App.css'

function App() {

  return (
    <>
        <SettingsProvider>
            <NoteActivityProvider>
                <ControlProvider>
                    <ScreenContainer />
                </ControlProvider>
            </NoteActivityProvider>
        </SettingsProvider >
    </>
  )
}

export default App
