import React, { useEffect, useRef, useState } from 'react';
import Track from '../track/index';
import MiddleTrack from '../middleTrack/index';
import './style/styles.css';

const Tracks = (props) => {
    const containerRef = useRef(null);
    const [scrollEnabled, setScrollEnabled] = useState(false); // Control scrolling behavior

    const baseHeight = 100; // Track should never be less than 100% height
    const additionalHeight = (props.songMilisec / 4000) * 100; // Divide song into 4-second spurts
    const totalHeight = baseHeight + additionalHeight; // Total height of song + 4 seconds
    const trackCount = 52;
    const musicalNotes = ["A", "B", "C", "D", "E", "F", "G"];

    const getTrackNote = (index) => {
        let octave = Math.floor(index / 7);
        const note = musicalNotes[index % 7];
        if (note === "C" || note === "D" || note === "E" || note === "F" || note === "G") {
            octave = octave + 1;
        }
        return `${note}${octave}`;
    };

    const getMiddleTrackNote = (index) => {
        let octave = Math.floor(index / 7);
        const note = musicalNotes[index % 7];
        if (note === "C" || note === "D" || note === "E" || note === "F" || note === "G") {
            octave = octave + 1;
        }
        return `${note}${"#"}${octave}`;
    };

    useEffect(() => {
        const container = containerRef.current;
        // Start the scrollbar at the bottom
        container.scrollTop = container.scrollHeight - container.clientHeight;

        if (scrollEnabled) {
            const totalDuration = props.songMilisec + 4000; // Total duration in milliseconds
            const scrollDistance = container.scrollHeight - container.clientHeight; // Total scrollable distance
            const scrollStep = scrollDistance / (totalDuration / 8); // Scroll step per animation frame (~8ms/frame)

            let currentScroll = container.scrollHeight - container.clientHeight; // Start at the bottom
            const scrollAnimation = () => {
                if (!scrollEnabled || currentScroll <= 0) return; // Stop scrolling if disabled or reached the top
                currentScroll -= scrollStep; // Move upwards
                container.scrollTop = currentScroll;
                requestAnimationFrame(scrollAnimation);
            };
            requestAnimationFrame(scrollAnimation);
        }
    }, [scrollEnabled, props.songMilisec]);

    const toggleScroll = (enabled) => {
        setScrollEnabled(enabled);
    };

    return (
        <>
            <div className="tracks-container" ref={containerRef}>
                {/* Background overlay */}
                <div className="background" style={{ height: `${totalHeight}%` }}></div>

                <div className="tracks" style={{ height: `${totalHeight}%` }}>
                    {Array.from({ length: trackCount }).map((_, index) => (
                        <Track
                            key={index}
                            note={getTrackNote(index)}
                            millisecondSongLength={props.songMilisec}
                        />
                    ))}
                </div>
                <div className="middle-tracks" style={{ height: `${totalHeight}%` }}>
                    {Array.from({ length: trackCount }).map((_, index) => (
                        <MiddleTrack key={index} note={getMiddleTrackNote(index)} />
                    ))}
                </div>
            </div>

        </>
    );
};

export default Tracks;
