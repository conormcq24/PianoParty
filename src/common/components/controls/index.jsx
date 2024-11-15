import React from 'react';
import VideoSlider from '../videoSlider/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff, faFilm, faBackwardStep, faPlay, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { faPiano, faRecordVinyl, faMusicMagnifyingGlass } from  '@fortawesome/pro-solid-svg-icons'
import './style/styles.css';



const Controls = (props) => {
    return (
        <>
            <div className="controls">
                <div className="control-item">
                    <div className="control-top">
                        <FontAwesomeIcon icon={faPiano} />
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
                    <div className="control-top hoverable-item-red">
                        <FontAwesomeIcon icon={faRecordVinyl} />
                    </div>
                    <div className="control-bottom">
                        <FontAwesomeIcon icon={faToggleOn} style={{color: 'palegreen'}}/>
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