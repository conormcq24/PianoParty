import React, { useState, useRef, useEffect, useContext } from "react";
import { HexColorPicker } from "react-colorful";
import WhiteKey from "../whiteKey/index";
import { SettingsContext } from "../../context/settingsContext/settingsContext";
import "./style/styles.css";

const VisualPref = (props) => {
    // Access global settings from the context
    const {
        whiteKeyShadow: globalWhiteKeyShadow,
        setWhiteKeyShadow: setGlobalWhiteKeyShadow,
        whiteKeyNoteMarker: globalWhiteKeyNoteMarker,
        setWhiteKeyNoteMarker: setGlobalWhiteKeyNoteMarker,
        whiteKeyColor: globalWhiteKeyColor,
        setWhiteKeyColor: setGlobalWhiteKeyColor,
        whiteKeyColorPressed: globalWhiteKeyColorPressed,
        setWhiteKeyColorPressed: setGlobalWhiteKeyColorPressed,
    } = useContext(SettingsContext);

    // Local state for immediate changes in the settings menu
    const [whiteKeyShadow, setWhiteKeyShadow] = useState(globalWhiteKeyShadow);
    const [whiteKeyNoteMarker, setWhiteKeyNoteMarker] = useState(globalWhiteKeyNoteMarker);
    const [colors, setColors] = useState({
        off: globalWhiteKeyColor,
        on: globalWhiteKeyColorPressed,
    });

    const [visiblePicker, setVisiblePicker] = useState(null); // Can be 'on' or 'off'
    const pickerRef = useRef(null);

    // Toggle functions for shadow and note marker
    const toggleShadow = () => {
      const newValue = !whiteKeyShadow;
      setWhiteKeyShadow(newValue);
    };

    const toggleNoteMarker = () => setWhiteKeyNoteMarker((prev) => !prev);

    // Handle color change
    const handleColorChange = (colorType, newColor) => {
        setColors((prev) => ({
            ...prev,
            [colorType]: newColor,
        }));
    };

    const togglePicker = (colorType) => {
        setVisiblePicker((prev) => (prev === colorType ? null : colorType)); // Toggle picker visibility
    };

    const confirmColorChange = () => {
        setVisiblePicker(null); // Close picker after confirmation
    };

    // Apply local settings to global context
    const handleWhiteKeySettingsSave = () => {
        setGlobalWhiteKeyShadow(whiteKeyShadow);
        setGlobalWhiteKeyColor(colors.off);
        setGlobalWhiteKeyColorPressed(colors.on);
        setGlobalWhiteKeyNoteMarker(whiteKeyNoteMarker);
    };

    // Close the color picker if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setVisiblePicker(null); // Close picker if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
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
                                whiteKeyColor={colors.off} // Local state
                            />
                            <WhiteKey
                                noteOctave={"A1"}
                                whiteKeyShadow={whiteKeyShadow}
                                whiteKeyNoteMarker={whiteKeyNoteMarker}
                                whiteKeyColorPressed={colors.on} // Local state
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
                                className={`toggle-button ${whiteKeyShadow ? "on-button" : "off-button"} dongle-regular`}
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
                                onClick={() => togglePicker("off")}
                                style={{ backgroundColor: colors.off }}
                            />
                            {visiblePicker === "off" && (
                                <div ref={pickerRef} style={{ marginTop: "10px" }}>
                                    <HexColorPicker
                                        color={colors.off}
                                        onChange={(color) => handleColorChange("off", color)}
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
                                onClick={() => togglePicker("on")}
                                style={{ backgroundColor: colors.on }}
                            />
                            {visiblePicker === "on" && (
                                <div ref={pickerRef} style={{ marginTop: "10px" }}>
                                    <HexColorPicker
                                        color={colors.on}
                                        onChange={(color) => handleColorChange("on", color)}
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
                                className={`toggle-button ${whiteKeyNoteMarker ? "on-button" : "off-button"} dongle-regular`}
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
