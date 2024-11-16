import React, { useState, useRef, useEffect, useContext } from "react";
import { HexColorPicker } from "react-colorful";
import WhiteKey from "../whiteKey/index";
import BlackKey from "../blackKey/index";
import { SettingsContext } from "../../context/settingsContext/settingsContext";
import "./style/styles.css";

const VisualPref = (props) => {
    /* actual keyboard state used globally */
    const {

        /* global white keys */
        whiteKeyShadow: globalWhiteKeyShadow,
        setWhiteKeyShadow: setGlobalWhiteKeyShadow,
        whiteKeyNoteMarker: globalWhiteKeyNoteMarker,
        setWhiteKeyNoteMarker: setGlobalWhiteKeyNoteMarker,
        whiteKeyColor: globalWhiteKeyColor,
        setWhiteKeyColor: setGlobalWhiteKeyColor,
        whiteKeyColorPressed: globalWhiteKeyColorPressed,
        setWhiteKeyColorPressed: setGlobalWhiteKeyColorPressed,

        /* global black keys */
        blackKeyShadow: globalBlackKeyShadow,
        setBlackKeyShadow: setGlobalBlackKeyShadow,
        blackKeyNoteMarker: globalBlackKeyNoteMarker,
        setBlackKeyNoteMarker: setGlobalBlackKeyNoteMarker,
        blackKeyColor: globalBlackKeyColor,
        setBlackKeyColor: setGlobalBlackKeyColor,
        blackKeyColorPressed: globalBlackKeyColorPressed,
        setBlackKeyColorPressed: setGlobalBlackKeyColorPressed,

    } = useContext(SettingsContext);

    /* local settings preview state for white keys */
    const [whiteKeyShadow, setWhiteKeyShadow] = useState(globalWhiteKeyShadow);
    const [whiteKeyNoteMarker, setWhiteKeyNoteMarker] = useState(globalWhiteKeyNoteMarker);
    /* toggle local white shadow */
    const toggleWhiteShadow = () => {
      const newValue = !whiteKeyShadow;
      setWhiteKeyShadow(newValue);
    };
    /* toggle local notes on white keys */
    const toggleWhiteNoteMarker = () => setWhiteKeyNoteMarker((prev) => !prev);

    /* local settings preview state for black keys */
    const [blackKeyShadow, setBlackKeyShadow] = useState(globalBlackKeyShadow);
    const [blackKeyNoteMarker, setBlackKeyNoteMarker] = useState(globalBlackKeyNoteMarker);
    /* toggle local black shadow */
    const toggleBlackShadow = () => {
      const newValue = !blackKeyShadow;
      setBlackKeyShadow(newValue)
    };
    /* toggle local notes on black keys */
    const toggleBlackNoteMarker = () => setBlackKeyNoteMarker((prev) => !prev);

    /* control visibility of color picker component */
    const [visiblePicker, setVisiblePicker] = useState(null); // Can be 'on' or 'off'
    const pickerRef = useRef(null);
    const togglePicker = (colorType) => {
        setVisiblePicker((prev) => (prev === colorType ? null : colorType)); // Toggle picker visibility
    };
    /* color control for both white and black keys */
    const [colors, setColors] = useState({
        whiteOff: globalWhiteKeyColor,
        whiteOn: globalWhiteKeyColorPressed,
        blackOff: globalBlackKeyColor,
        blackOn: globalBlackKeyColorPressed,
    });
    /* color change handler */
    const handleColorChange = (colorType, newColor) => {
        setColors((prev) => ({
            ...prev,
            [colorType]: newColor,
        }));
    };
    const confirmColorChange = () => {
        if (visiblePicker === "whiteOff") {
            setWhiteKeyColor(colors.whiteOff);
        } else if (visiblePicker === "whiteOn") {
            setWhiteKeyColorPressed(colors.whiteOn);
        } else if (visiblePicker === "blackOff") {
            setBlackKeyColor(colors.blackOff);
        } else if (visiblePicker === "blackOn") {
            setBlackKeyColorPressed(colors.blackOn);
        }
        setVisiblePicker(null); // Close picker
    };

    /* handle out of bounds click on color picker */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setVisiblePicker(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    /* apply white local settings to global keys */
    const handleWhiteKeySettingsSave = () => {
        setGlobalWhiteKeyShadow(whiteKeyShadow);
        setGlobalWhiteKeyColor(colors.whiteOff);
        setGlobalWhiteKeyColorPressed(colors.whiteOn);
        setGlobalWhiteKeyNoteMarker(whiteKeyNoteMarker);
    };

    /* apply black local settings to global keys */
    const handleBlackKeySettingsSave = () => {
        setGlobalBlackKeyShadow(blackKeyShadow);
        setGlobalBlackKeyColor(colors.blackOff);
        setGlobalBlackKeyColorPressed(colors.blackOn);
        setGlobalBlackKeyNoteMarker(blackKeyNoteMarker);
    };

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
                                whiteKeyColor={colors.whiteOff} // Local state
                            />
                            <WhiteKey
                                noteOctave={"A1"}
                                whiteKeyShadow={whiteKeyShadow}
                                whiteKeyNoteMarker={whiteKeyNoteMarker}
                                whiteKeyColorPressed={colors.whiteOn} // Local state
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
                                onClick={toggleWhiteShadow}
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
                                onClick={() => togglePicker("whiteOff")}
                                style={{ backgroundColor: colors.whiteOff }}
                            />
                            {visiblePicker === "whiteOff" && (
                                <div ref={pickerRef} style={{ marginTop: "10px" }}>
                                    <HexColorPicker
                                        color={colors.whiteOff}
                                        onChange={(color) => handleColorChange("whiteOff", color)}
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
                                onClick={() => togglePicker("whiteOn")}
                                style={{ backgroundColor: colors.whiteOn }}
                            />
                            {visiblePicker === "whiteOn" && (
                                <div ref={pickerRef} style={{ marginTop: "10px" }}>
                                    <HexColorPicker
                                        color={colors.whiteOn}
                                        onChange={(color) => handleColorChange("whiteOn", color)}
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
                                onClick={toggleWhiteNoteMarker}
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
            <div className="settings-group">
                <div className="settings-group-header">
                    <h2 className="dongle-regular">Black Key Settings</h2>
                </div>
                <div className="settings-group-body">
                    <div className="settings-group-item">
                        <div className="settings-group-item-title">
                            <h2 className="dongle-regular">Black Key Preview</h2>
                        </div>
                        <div className="settings-group-item-body">
                            <BlackKey
                                noteOctave={"A#0"}
                                blackKeyShadow={blackKeyShadow}
                                blackKeyNoteMarker={blackKeyNoteMarker}
                                blackKeyColor={colors.blackOff} // Local state
                            />
                            <BlackKey
                                noteOctave={"C#1"}
                                blackKeyShadow={blackKeyShadow}
                                blackKeyNoteMarker={blackKeyNoteMarker}
                                blackKeyColorPressed={colors.blackOn} // Local state
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
                                className={`toggle-button ${blackKeyShadow ? "on-button" : "off-button"} dongle-regular`}
                                onClick={toggleBlackShadow}
                            >
                                {blackKeyShadow ? "ON" : "OFF"}
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
                                onClick={() => togglePicker("blackOff")}
                                style={{ backgroundColor: colors.blackOff }}
                            />
                            {visiblePicker === "blackOff" && (
                                <div ref={pickerRef} style={{ marginTop: "10px" }}>
                                    <HexColorPicker
                                        color={colors.blackOff}
                                        onChange={(color) => handleColorChange("blackOff", color)}
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
                                onClick={() => togglePicker("blackOn")}
                                style={{ backgroundColor: colors.blackOn }}
                            />
                            {visiblePicker === "blackOn" && (
                                <div ref={pickerRef} style={{ marginTop: "10px" }}>
                                    <HexColorPicker
                                        color={colors.blackOn}
                                        onChange={(color) => handleColorChange("blackOn", color)}
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
                                className={`toggle-button ${blackKeyNoteMarker ? "on-button" : "off-button"} dongle-regular`}
                                onClick={toggleBlackNoteMarker}
                            >
                                {blackKeyNoteMarker ? "ON" : "OFF"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="apply-button-box">
                <h2
                    className="dongle-regular apply-button"
                    onClick={handleBlackKeySettingsSave}
                >
                    Apply Black Key Settings
                </h2>
            </div>
        </>
    );
};

export default VisualPref;
