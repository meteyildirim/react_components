import React, { useState, useRef, useEffect } from "react";

const SubMenuItem = ({
  name,
  onClick,
  highlighted,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className="submenu-item"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        backgroundColor: highlighted ? "lightgray" : "white",
        color: "black",
      }}
    >
      {name}
    </div>
  );
};

const SubMenu = ({
  items,
  onItemClick,
  highlightedItem,
  setHighlightedItem,
}) => {
  const subMenuRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
      onItemClick(null);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onItemClick(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="submenu" ref={subMenuRef}>
      {items.map((item, index) => (
        <SubMenuItem
          key={index}
          name={item.name}
          onClick={item.onClick}
          highlighted={highlightedItem === index}
          onMouseEnter={() => setHighlightedItem(index)}
          onMouseLeave={() => setHighlightedItem(null)}
        />
      ))}
    </div>
  );
};

const SaveButton = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedItem, setHighlightedItem] = useState(null);
  const buttonRef = useRef(null);
  const [subMenuPosition, setSubMenuPosition] = useState("below");

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleOutsideClick = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const buttonPosition = buttonRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (buttonPosition.bottom + 500 > windowHeight) {
      setSubMenuPosition("above");
    } else {
      setSubMenuPosition("below");
    }
  });

  return (
    <div className="save-button" ref={buttonRef}>
      <button
        className="button"
        // onMouseEnter={() => setIsOpen(true)}
        // onMouseLeave={() => setIsOpen(false)}
        onClick={handleButtonClick}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        style={{
          backgroundColor: isOpen ? "#333" : "black",
          color: "white",
        }}
      >
        Save
      </button>
      {isOpen && (
        <SubMenu
          items={items}
          onItemClick={setHighlightedItem}
          highlightedItem={highlightedItem}
          setHighlightedItem={setHighlightedItem}
        />
      )}
    </div>
  );
};

export default SaveButton;
