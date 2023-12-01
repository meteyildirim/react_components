import React, { useState, useRef, useEffect } from "react";

const CustomButton = ({
  buttonName = "Save",
  items = [],
  onItemSelect,
  isActive,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuDirection, setMenuDirection] = useState("down");
  const buttonRef = useRef(null);
  const buttonRefInner = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (buttonRect.bottom + 3 * 16 > windowHeight) {
      setMenuDirection("up");
    } else {
      setMenuDirection("down");
    }
  }, [isActive]);

  const handleItemClick = (item) => {
    onItemSelect(item);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="custom-button" ref={buttonRef}>
      <button
        ref={buttonRefInner}
        className="button-left"
        id="btn-dropbox"
        // onClick={toggleMenu}
        style={{
          color: "white",
          backgroundColor: "black",
          border: "none",
          width: "5rem",
          height: "2rem",
          borderRadius: "4px",
          margin: "2px",
          position: "fixed",
        }}
        onMouseOver={(e) => {
          buttonRefInner.current.style.backgroundColor = "#3a3a3a";
        }}
        onMouseOut={(e) => {
          buttonRefInner.current.style.backgroundColor = "black";
        }}
      >
        {buttonName}
        <span style={{ fontSize: "20px", padding: "3px", marginLeft: "3px" }}>
          &#124;
        </span>
        <a
          className={`button-right ${isOpen ? "up-arrow" : "down-arrow"}`}
          onClick={toggleMenu}
          style={{
            color: "white",
            backgroundColor: isActive ? "black" : "gray",
            border: "none",
            width: "1rem",
            height: "2rem",
            alignContent: "center",
            alignItems: "",
            justifyContent: "center",
            margin: "2px",
          }}
        >
          {menuDirection === "up" ? (
            <span>&#x25B3;</span>
          ) : (
            <span>&#x25BD;</span>
          )}
        </a>
      </button>

      {isOpen && (
        <div
          className={`popup-menu ${menuDirection}`}
          ref={menuRef}
          style={{
            backgroundColor: isActive ? "black" : "gray",
            width: "3rem",
            color: "white",
          }}
        >
          <div style={{}}>
            {items.map((item, index) => (
              <div
                key={index}
                className="menu-item"
                onClick={() => handleItemClick(item)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = isActive
                    ? "#3a3a3a"
                    : "black";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = isActive ? "black" : "gray";
                }}
                style={{
                  color: "white",
                  padding: "5px",
                  width: "2rem",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomButton;
