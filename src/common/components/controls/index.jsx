import React, { useContext } from 'react';
import VideoSlider from '../videoSlider/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff, faFilm, faBackwardStep, faPlay, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { faPiano, faRecordVinyl, faMusicMagnifyingGlass, faVolume } from  '@fortawesome/pro-solid-svg-icons';
import { ControlContext } from '../../context/controlContext/controlContext';
import './style/styles.css';



const Controls = (props) => {

    /* Access isPianoConnected with controlContext */
    const { pianoConnected, toggleMute, mute } = useContext(ControlContext);

    return (
        <>
            <div className="controls">
                <div className="control-item">
                    <div className="control-top">
                        <FontAwesomeIcon icon={faPiano} />
                    </div>
                    <div className="control-bottom">
                        { pianoConnected && (
                            <FontAwesomeIcon icon={faToggleOn} style={{color: 'palegreen'}}/>
                        )}
                        { !pianoConnected && (
                            <FontAwesomeIcon icon={faToggleOff} style={{color: 'tomato'}}/>
                        )}
                    </div>
                </div>
                <div className="control-item">
                    <div className="control-top hoverable-item-red">
                        <FontAwesomeIcon icon={faRecordVinyl} />
                    </div>
                    <div className="control-bottom">
                        <FontAwesomeIcon icon={faToggleOn} style={{color: 'palegreen'}}/>
                    </div>
                </div>
                <div className="control-item">
                    <div className="control-top hoverable-item-red">
                        <FontAwesomeIcon icon={faVolume} onClick={toggleMute}/>
                    </div>
                    <div className="control-bottom">
                        { !mute && (
                            <FontAwesomeIcon icon={faToggleOn} style={{color: 'palegreen'}}/>
                        )}
                        { mute && (
                            <FontAwesomeIcon icon={faToggleOff} style={{color: 'tomato'}}/>
                        )}
                    </div>
                </div>
                <div className="control-item">
                    <div className="control-top hoverable-item-green">
                        <FontAwesomeIcon icon={faFilm} />
                    </div>
                </div>
                <div className="control-item">
                    <div className="control-top hoverable-item-red">
                        <FontAwesomeIcon icon={faBackwardStep} />
                    </div>
                </div>
                <div className="control-item">
                    <div className="control-top hoverable-item-red">
                        <FontAwesomeIcon icon={faMusicMagnifyingGlass} />
                    </div>
                </div>
                <div className="long-control-item">
                    <div className="control-top">
                        <VideoSlider />
                    </div>
                </div>
                <div className="control-item">
                    <div className="control-top hoverable-item-red">
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                </div>
                <div className="control-item">
                    <div className="control-top hoverable-item-red">
                        <FontAwesomeIcon icon={faForwardStep} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Controls;