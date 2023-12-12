import React, { useState, useRef, useEffect } from "react";

const HorizontalLine = ({ x, y }) => {
  const [positionY, setPositionY] = useState(y);
  const [isDragging, setIsDragging] = useState(false);
  const lineRef = useRef(null);
  const dragOffsetRef = useRef(0);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    dragOffsetRef.current = lineRef.current.getBoundingClientRect().top;
  };

  const handleDrag = (event) => {
    if (isDragging) {
      let newY = event.clientY - dragOffsetRef.current;
      newY = Math.max(0, newY); // Limit dragging vertically within the container
      setPositionY(newY);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", handleDragEnd);
    } else {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={lineRef}
      className="horizontal-line"
      style={{
        position: "absolute",
        top: positionY,
        left: x,
        width: "1000px", // Adjust line width as needed
        height: "3px", // Adjust line height as needed
        backgroundColor: "black",
        cursor: "ns-resize", // Cursor for vertical dragging
      }}
      onMouseDown={handleMouseDown}
    />
  );
};

export default HorizontalLine;
