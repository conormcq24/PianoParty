import React from 'react';
import './style/styles.css';

const Settings = (props) => {
  return (
    <>
        { props.showSettings && (
            <div className="settings">
                <div className="settings-menu">
                    <div className="settings-list">
                        <div className="settings-item">
                            <h5>Visual Preferences</h5>
                        </div>
                        <div className="settings-item">
                            <h5>Audio Preferences</h5>
                        </div>
                        <div className="settings-item">
                            <h5>Video Preferences</h5>
                        </div>
                        <div className="settings-item">
                            <h5>Output Preferences</h5>
                        </div>
                        <div className="settings-close">
                            <button className="close-btn">Exit Settings</button>
                        </div>
                    </div>
                </div>
                <div className="settings-editor">
                </div>
            </div>
        )}
    </>
  );
};

export default Settings;