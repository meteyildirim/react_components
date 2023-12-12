import React, { useRef, useState, useEffect } from "react";

const CoordinateSystem = ({ minX, maxX, minY, maxY }) => {
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const [xAxisOffset, setXAxisOffset] = useState(0);
  const [yAxisOffset, setYAxisOffset] = useState(0);
  const [isDraggingX, setIsDraggingX] = useState(false);
  const [isDraggingY, setIsDraggingY] = useState(false);

  const handleXAxisDragStart = (event) => {
    setIsDraggingX(true);
    setXAxisOffset(
      event.clientX - xAxisRef.current.getBoundingClientRect().left
    );
  };

  const handleYAxisDragStart = (event) => {
    setIsDraggingY(true);
    setYAxisOffset(
      event.clientY - yAxisRef.current.getBoundingClientRect().top
    );
  };

  const handleDrag = (event) => {
    if (isDraggingX) {
      let newOffset =
        event.clientX -
        xAxisRef.current.parentElement.getBoundingClientRect().left -
        xAxisOffset;
      newOffset = Math.max(
        0,
        Math.min(newOffset, xAxisRef.current.parentElement.offsetWidth)
      );
      setXAxisOffset(newOffset);
    }
    if (isDraggingY) {
      let newOffset =
        event.clientY -
        yAxisRef.current.parentElement.getBoundingClientRect().top -
        yAxisOffset;
      newOffset = Math.max(
        0,
        Math.min(newOffset, yAxisRef.current.parentElement.offsetHeight)
      );
      setYAxisOffset(newOffset);
    }
  };

  const handleDragEnd = () => {
    setIsDraggingX(false);
    setIsDraggingY(false);
  };

  useEffect(() => {
    if (isDraggingX || isDraggingY) {
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
  }, [isDraggingX, isDraggingY]);

  return (
    <div className="coordinate-system" style={{ position: "relative" }}>
      <div
        ref={xAxisRef}
        className="x-axis"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${(maxY / (maxY - minY)) * 100}%`,
          transform: "translateY(-50%)",
          cursor: "grab",
        }}
        onMouseDown={handleXAxisDragStart}
      >
        <hr width="50%" color="black" />
      </div>
      <div
        ref={yAxisRef}
        className="y-axis"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${(minX / (maxX - minX)) * 100}%`,
          transform: "translateX(-50%)",
          cursor: "grab",
        }}
        onMouseDown={handleYAxisDragStart}
      >
        Y Axis
      </div>
      {/* Other content of the coordinate system */}
    </div>
  );
};

export default CoordinateSystem;
