import React, { useState, useRef } from 'react';
import './style/styles.css';

const VideoSlider = () => {
  const [currentTime, setCurrentTime] = useState(50); // Current position (0-100)
  const [start, setStart] = useState(0); // Start bar position (0-100)
  const [end, setEnd] = useState(100); // End bar position (0-100)
  const [isDragging, setIsDragging] = useState({ circle: false, start: false, end: false }); // Drag state
  const sliderRef = useRef(null);

  const handleMouseDown = (type) => {
    setIsDragging((prev) => ({ ...prev, [type]: true }));
  };

  const handleMouseUp = () => {
    setIsDragging({ circle: false, start: false, end: false });
  };

  const handleMouseMove = (e) => {
    if (!sliderRef.current) return;
    const sliderWidth = sliderRef.current.offsetWidth;
    const newPosition = ((e.clientX - sliderRef.current.offsetLeft) / sliderWidth) * 100;

    if (isDragging.circle) {
      const constrainedPosition = Math.max(start, Math.min(newPosition, end));
      setCurrentTime(constrainedPosition);
    } else if (isDragging.start) {
      const constrainedStart = Math.max(0, Math.min(newPosition, end - 1));
      setStart(constrainedStart);
      if (currentTime < constrainedStart) setCurrentTime(constrainedStart); // Adjust circle if needed
    } else if (isDragging.end) {
      const constrainedEnd = Math.max(start + 1, Math.min(newPosition, 100));
      setEnd(constrainedEnd);
      if (currentTime > constrainedEnd) setCurrentTime(constrainedEnd); // Adjust circle if needed
    }
  };

  React.useEffect(() => {
    if (isDragging.circle || isDragging.start || isDragging.end) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]); // Re-run when dragging state changes

  return (
    <div className="slider-container">
      <div ref={sliderRef} className="slider-track">
        {/* Start Bar */}
        <div
          className="start-bar"
          style={{ left: `${start}%` }}
          onMouseDown={() => handleMouseDown('start')}
        />
        {/* End Bar */}
        <div
          className="end-bar"
          style={{ left: `${end}%` }}
          onMouseDown={() => handleMouseDown('end')}
        />
        {/* Current Time Circle */}
        <div
          className="circle"
          style={{ left: `${currentTime}%` }}
          onMouseDown={() => handleMouseDown('circle')}
        />
      </div>
    </div>
  );
};

export default VideoSlider;
