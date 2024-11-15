import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import WhiteKey from '../whiteKey/index';
import './style/styles.css';

const VisualPref = (props) => {
    /* state variables for basic on/off settings */
    const [whiteKeyShadow, setWhiteKeyShadow] = useState(props.whiteKeyShadow);
    const [whiteKeyNoteMarker, setIsNoteMarkerOn] = useState(props.whiteKeyNoteMarker);

    /* toggle functions for basic on/off states */
    const toggleShadow = () => setWhiteKeyShadow(prev => !prev);
    const toggleNoteMarker = () => setIsNoteMarkerOn(prev => !prev);

    /* common state for color pickers */
    const [colors, setColors] = useState({
        on: props.whiteKeyColorPressed,
        off: props.whiteKeyColor,
    });

    const [visiblePicker, setVisiblePicker] = useState(null); // Can be 'on' or 'off'
    const pickerRef = useRef(null);

    // Function to handle color change for both on and off colors
    const handleColorChange = (colorType, newColor) => {
        setColors(prev => ({
            ...prev,
            [colorType]: newColor
        }));
    };

    const togglePicker = (colorType) => {
        setVisiblePicker(prev => prev === colorType ? null : colorType); // Toggle picker visibility
    };

    const confirmColorChange = () => {
        setVisiblePicker(null); // Close picker after confirmation
    };

    const handleWhiteKeySettingsSave = () => {
            props.setWhiteKeyShadow(whiteKeyShadow);
            props.setWhiteKeyColor(colors.off);
            props.setWhiteKeyColorPressed(colors.on);
            props.setWhiteKeyNoteMarker(whiteKeyNoteMarker);
    };

    // Close the color picker if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setVisiblePicker(null); // Close picker if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <h2 className="dynapuff-piano-party">Visual Preferences</h2>
            <div className="settings-group">
                <div className="settings-group-header">
                    <h2 className="dongle-regular">White Key Settings</h2>
                </div>
                <div className="settings-group-body">
                    <div className="settings-group-item">
                        <div className="settings-group-item-title">
                            <h2 className="dongle-regular">White Key Preview</h2>
                        </div>
                        <div className="settings-group-item-body">
                            <WhiteKey
                                noteOctave={"A0"}
                                whiteKeyShadow={whiteKeyShadow}
                                whiteKeyNoteMarker={whiteKeyNoteMarker}
                                whiteKeyColor={colors.off} // Use the offColor from state
                            />
                            <WhiteKey
                                noteOctave={"A1"}
                                whiteKeyShadow={whiteKeyShadow}
                                whiteKeyNoteMarker={whiteKeyNoteMarker}
                                whiteKeyColorPressed={colors.on} // Use the offColor from state
                                isExampleOn={true}
                            />
                        </div>
                    </div>

                    {/* Shadow Toggle */}
                    <div className="settings-group-item">
                        <div className="settings-group-item-title">
                            <h2 className="dongle-regular">Shadow</h2>
                        </div>
                        <div className="settings-group-item-body">
                            <div
                                className={`toggle-button ${whiteKeyShadow ? 'on-button' : 'off-button'} dongle-regular`}
                                onClick={toggleShadow}
                            >
                                {whiteKeyShadow ? "ON" : "OFF"}
                            </div>
                        </div>
                    </div>

                    {/* Off Color Picker */}
                    <div className="settings-group-item">
                        <div className="settings-group-item-title">
                            <h2 className="dongle-regular">Off Color</h2>
                        </div>
                        <div className="settings-group-item-body">
                            <div
                                className="settings-group-color-picker"
                                onClick={() => togglePicker('off')}
                                style={{ backgroundColor: colors.off }}
                            />
                            {visiblePicker === 'off' && (
                                <div ref={pickerRef} style={{ marginTop: '10px' }}>
                                    <HexColorPicker
                                        color={colors.off}
                                        onChange={(color) => handleColorChange('off', color)}
                                    />
                                    <button onClick={confirmColorChange}>Confirm</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* On Color Picker */}
                    <div className="settings-group-item">
                        <div className="settings-group-item-title">
                            <h2 className="dongle-regular">On Color</h2>
                        </div>
                        <div className="settings-group-item-body">
                            <div
                                className="settings-group-color-picker"
                                onClick={() => togglePicker('on')}
                                style={{ backgroundColor: colors.on }}
                            />
                            {visiblePicker === 'on' && (
                                <div ref={pickerRef} style={{ marginTop: '10px' }}>
                                    <HexColorPicker
                                        color={colors.on}
                                        onChange={(color) => handleColorChange('on', color)}
                                    />
                                    <button onClick={confirmColorChange}>Confirm</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Note Marker Toggle */}
                    <div className="settings-group-item">
                        <div className="settings-group-item-title">
                            <h2 className="dongle-regular">Note Marker</h2>
                        </div>
                        <div className="settings-group-item-body">
                            <div
                                className={`toggle-button ${whiteKeyNoteMarker ? 'on-button' : 'off-button'} dongle-regular`}
                                onClick={toggleNoteMarker}
                            >
                                {whiteKeyNoteMarker ? "ON" : "OFF"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="apply-button-box">
                <h2
                    className="dongle-regular apply-button"
                    onClick={handleWhiteKeySettingsSave}
                >
                    Apply White Key Settings
                </h2>
            </div>
        </>
    );
};

export default VisualPref;
