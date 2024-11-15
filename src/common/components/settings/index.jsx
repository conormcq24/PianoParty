import React, { useState, useEffect, useContext } from 'react';
import { SettingsContext } from '../../context/settingsContext/settingsContext';
import VisualPref from '../visualPref/index';
import AudioPref from '../audioPref/index';
import VideoPref from '../videoPref/index';
import OutputPref from '../outputPref/index';
import './style/styles.css';

const Settings = (props) => {
  /* track state of the active menu item in settings */
  const [activeSetting, setActiveSetting] = useState("Visual Preferences");

  const {
      showSettings
    } = useContext(SettingsContext);

  /*
    reset to default selection of visual preferences
    when settings menu is closed
  */
  useEffect(() => {
    if (!showSettings) {
      setActiveSetting("Visual Preferences");
    }
  }, [showSettings]);

  /* handle setting menu item selection */
  const handleSettingClick = (setting) => {
    setActiveSetting(setting);
  };

  return (
    <>
      {showSettings && (
        <div className="settings">
          <div className="settings-menu">
            <div className="settings-list">
              <div
                className={`settings-item ${activeSetting === "Visual Preferences" ? "active" : ""}`}
                onClick={() => handleSettingClick("Visual Preferences")}
              >
                <h2 className="dongle-regular">Visual Preferences</h2>
              </div>
              <div
                className={`settings-item ${activeSetting === "Audio Preferences" ? "active" : ""}`}
                onClick={() => handleSettingClick("Audio Preferences")}
              >
                <h2 className="dongle-regular">Audio Preferences</h2>
              </div>
              <div
                className={`settings-item ${activeSetting === "Video Preferences" ? "active" : ""}`}
                onClick={() => handleSettingClick("Video Preferences")}
              >
                <h2 className="dongle-regular">Video Preferences</h2>
              </div>
              <div
                className={`settings-item ${activeSetting === "Output Preferences" ? "active" : ""}`}
                onClick={() => handleSettingClick("Output Preferences")}
              >
                <h2 className="dongle-regular">Output Preferences</h2>
              </div>
            </div>
          </div>
          <div className="settings-editor">
            <div className="settings-detail-box">
                {activeSetting === "Visual Preferences" && (
                  <>
                    <VisualPref />
                  </>
                )}
                {activeSetting === "Audio Preferences" && (
                  <>
                    <AudioPref />
                  </>
                )}
                {activeSetting === "Video Preferences" && (
                  <>
                    <VideoPref />
                  </>
                )}
                {activeSetting === "Output Preferences" && (
                  <>
                    <OutputPref />
                  </>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
