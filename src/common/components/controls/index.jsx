import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff, faFilm } from '@fortawesome/free-solid-svg-icons';
import { faPianoKeyboard } from  '@fortawesome/pro-solid-svg-icons'
import './style/styles.css';



const Controls = (props) => {
    return (
        <>
            <div className="controls">
                <div className="control-item">
                    <div className="control-top">
                        <FontAwesomeIcon icon={faPianoKeyboard} />
                    </div>
                    <div className="control-bottom">
                        { props.pianoConnected && (
                            <FontAwesomeIcon icon={faToggleOn} style={{color: 'palegreen'}}/>
                        )}
                        { !props.pianoConnected && (
                            <FontAwesomeIcon icon={faToggleOff} style={{color: 'tomato'}}/>
                        )}
                    </div>
                </div>
                <div className="control-item">
                    <div className="control-top hoverable-item">
                        <FontAwesomeIcon icon={faFilm} />
                    </div>
                </div>
                <div className="control-item">
                </div>
                <div className="control-item">
                </div>
                <div className="control-item">
                </div>
            </div>
        </>
    );
};

export default Controls;