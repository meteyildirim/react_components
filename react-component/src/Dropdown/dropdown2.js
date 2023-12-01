import React, { useState, useRef, useEffect } from "react";

const SubMenu = ({ items = [] }) => {
  return (
    <div
      className="submenu"
      style={{ backgroundColor: "black", padding: "0rem", minWidth: "4rem" }}
    >
      {items.map((menuItem, index) => (
        <div
          key={index}
          id={index}
          className="submenu-item"
          onClick={menuItem.onClick}
          style={{
            color: "white",
            backgroundColor: "black",
            //padding: "0.3rem 0.5rem",
            cursor: "pointer",
            marginBottom: "0.1rem",
          }}
          onMouseEnter={(e) => {
            document.getElementById(index).style.backgroundColor = "#201f1f";
          }}
          onMouseLeave={(e) => {
            document.getElementById(index).style.backgroundColor = "#000000";
          }}
        >
          {menuItem.name}
        </div>
      ))}
    </div>
  );
};

const DropDownButton = ({ buttonName = "Save ", subMenuItems = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuAbove, setIsSubMenuAbove] = useState(false);
  const buttonRef = useRef(null);
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
    const spaceBelow = windowHeight - buttonRect.bottom;

    if (spaceBelow < subMenuItems.length * 30) {
      setIsSubMenuAbove(true);
    } else {
      setIsSubMenuAbove(false);
    }
  }, [subMenuItems]);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="dropdown-button"
      style={{ display: "inline-block", textAlign: "center" }}
    >
      <button
        className="button"
        onClick={null}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#201f1f";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#000000";
        }}
        style={{
          color: "white",
          backgroundColor: "#000000",
          padding: "0.5rem",
          border: "none",
          borderRadius: "4px",
        }}
        ref={buttonRef}
      >
        {buttonName}{" "}
        <span style={{ fontSize: "20px", padding: "5px", marginLeft: "3px" }}>
          &#124;
        </span>
        <span onClick={toggleSubMenu}>&#x25BD;</span>
      </button>
      {isOpen && (
        <div
          className={`popup-menu ${isSubMenuAbove ? "above" : "below"}`}
          ref={menuRef}
          style={{
            position: "absolute",
            backgroundColor: "#000000",
            color: "white",
            padding: "0.1rem",
            minWidth: "6rem",
            marginTop: isSubMenuAbove
              ? `-${subMenuItems.length * 38}px`
              : "0.1rem",
            marginLeft: "0.8rem",
            border: "none",
            borderRadius: "3px",
          }}
        >
          <SubMenu items={subMenuItems} />
        </div>
      )}
    </div>
  );
};

export default DropDownButton;
