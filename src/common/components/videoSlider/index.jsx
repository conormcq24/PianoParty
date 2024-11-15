import React, { useState, useRef } from 'react';
import './style/styles.css'; // You can create your own styles here

const VideoSlider = () => {
  const [currentTime, setCurrentTime] = useState(50); // Example value (0-100)
  const [start, setStart] = useState(0); // Example start position (0-100)
  const [end, setEnd] = useState(100); // Example end position (0-100)

  const circleRef = useRef(null);
  const sliderRef = useRef(null);

  const handleCircleDrag = (e) => {
    const sliderWidth = sliderRef.current.offsetWidth;
    let newPosition = ((e.clientX - sliderRef.current.offsetLeft) / sliderWidth) * 100;
    newPosition = Math.min(Math.max(newPosition, start), end); // Constrain to start and end values
    setCurrentTime(newPosition);
  };

  const handleMouseMove = (e) => {
    if (circleRef.current && e.buttons === 1) {
      handleCircleDrag(e);
    }
  };

  const handleStartDrag = (e) => {
    const sliderWidth = sliderRef.current.offsetWidth;
    let newPosition = ((e.clientX - sliderRef.current.offsetLeft) / sliderWidth) * 100;
    setStart(Math.min(newPosition, end - 1)); // Start must be less than End
  };

  const handleEndDrag = (e) => {
    const sliderWidth = sliderRef.current.offsetWidth;
    let newPosition = ((e.clientX - sliderRef.current.offsetLeft) / sliderWidth) * 100;
    setEnd(Math.max(newPosition, start + 1)); // End must be greater than Start
  };

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        {/* Start Bar */}
        <div
          className="start-bar"
          style={{ left: `${start}%` }}
          onMouseDown={(e) => handleStartDrag(e)}
        />
        {/* End Bar */}
        <div
          className="end-bar"
          style={{ left: `${end}%` }}
          onMouseDown={(e) => handleEndDrag(e)}
        />
        {/* Slider Track */}
        <div
          ref={sliderRef}
          className="slider-track"
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseUp={(e) => handleCircleDrag(e)}
        >
          {/* Current Time Circle */}
          <div
            ref={circleRef}
            className="circle"
            style={{
              left: `${currentTime}%`,
            }}
            onMouseDown={(e) => handleCircleDrag(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;
