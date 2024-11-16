import React from 'react';
import Track from '../track/index';
import MiddleTrack from '../middleTrack/index';
import './style/styles.css';

const Tracks = (props) => {
    const trackCount = 52;  // Number of tracks to render
    const musicalNotes = ["A", "B", "C", "D", "E", "F", "G"];

    /* programmatically assign musical notes to tracks */
    const getTrackNote = (index) => {
        /* octave should equal index / 7 because octave shifts every 7 notes */
        let octave = Math.floor(index / 7);
        /* find the note associated with the index */
        const note = musicalNotes[index % 7];
        /* increment octave by 1 in these cases because of weird way musical notes operate */
        if(note === "C" || note === "D" || note === "E" || note === "F" || note === "G")
        {
            octave = octave + 1;
        }
        return `${note}${octave}`;
    };

    /* programmatically assign musical notes to middle tracks */
    const getMiddleTrackNote = (index) => {
        /* octave should equal index / 7 because octave shifts every 7 notes */
        let octave = Math.floor(index / 7);
        /* find the note associated with the index */
        const note = musicalNotes[index % 7];
        /* increment octave by 1 in these cases because of weird way musical notes operate */
        if(note === "C" || note === "D" || note === "E" || note === "F" || note === "G")
        {
            octave = octave + 1;
        }
        return `${note}${"#"}${octave}`;
    }

    return (
        <>
            <div className="track-container">
                <div className="tracks">
                    {Array.from({ length: trackCount }).map((_, index) => (
                        <Track key={index} note={getTrackNote(index)}/>
                    ))}
                </div>
                <div className="middle-tracks">
                    {Array.from({ length: trackCount }).map((_, index) => (
                        <MiddleTrack key={index} note={getMiddleTrackNote(index)}/>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Tracks;