import React, { useState, useRef } from "react";

const PopupMenu = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const menuRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault(); // Prevents default tab behavior

      if (event.shiftKey) {
        // Move to the previous item
        setSelectedItem((prev) => (prev === 0 ? items.length - 1 : prev - 1));
      } else {
        // Move to the next item
        setSelectedItem((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      }
    }
  };

  const handleBlur = () => {
    setSelectedItem(0); // Reset selection when the menu loses focus
  };

  return (
    <div
      className="popup-menu"
      ref={menuRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      style={{
        border: "1px solid black",
        padding: "5px",
        display: "inline-block",
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor: index === selectedItem ? "lightgray" : "white",
            padding: "5px",
            cursor: "pointer",
          }}
          onClick={() => console.log(`Clicked on ${item}`)} // Add your onClick function here
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default PopupMenu;
