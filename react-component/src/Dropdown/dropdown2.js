import React, { useState, useRef, useEffect } from "react";

const SubMenu = ({ items = [], toggleSubMenu }) => {
  return (
    <div
      className="submenu"
      id="id-submenu"
      style={{
        backgroundColor: "white",
        padding: "0rem",
        minWidth: "4rem",
        border: "none",
      }}
    >
      {items.map((menuItem, index) => (
        <div
          key={index}
          id={index}
          className="submenu-item"
          onClick={menuItem.onClick}
          style={{
            color: "black",
            border: "none",
            backgroundColor: "white",
            cursor: "pointer",
            marginBottom: "0.1rem",
          }}
          onMouseEnter={(e) => {
            document.getElementById(index).style.backgroundColor = "#EFEFEF";
            e.stopPropagation();
          }}
          onMouseLeave={(e) => {
            document.getElementById(index).style.backgroundColor = "#FFFFFF";
            e.stopPropagation();
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

  const subMainMenuStyle = {
    position: "absolute",
    backgroundColor: "white",
    color: "white",
    padding: "0.1rem",
    minWidth: "6rem",
    marginTop: isSubMenuAbove ? `-${subMenuItems.length * 40}px` : "0.1rem",
    marginLeft: "0.8rem",
    border: "none",
    borderRadius: "3px",
  };

  return (
    <div
      className="dropdown-button"
      style={{ display: "inline-block", textAlign: "center", border: "none" }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#4a4949";
        e.stopPropagation();
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#000000";
        e.stopPropagation();
      }}
    >
      <button
        className="button"
        onClick={null}
        style={{
          color: "white",
          backgroundColor: "#000000",
          padding: "0.3rem",
          border: "none",
          borderRadius: "4px",
        }}
        ref={buttonRef}
      >
        {buttonName}
        <span
          style={{
            fontSize: "20px",
            padding: "5px",
            marginLeft: "3px",
            backgroundColor: "none",
            border: "none",
          }}
        >
          &#124;
        </span>
        <span
          style={{
            backgroundColor: "none",
            border: "none",
          }}
          onClick={toggleSubMenu}
        >
          &#x25BD;
        </span>
      </button>
      {isOpen && (
        <div
          className={`popup-menu ${isSubMenuAbove ? "above" : "below"}`}
          ref={menuRef}
          style={subMainMenuStyle}
        >
          <SubMenu items={subMenuItems} toggleSubMenu={toggleSubMenu} />
        </div>
      )}
    </div>
  );
};

export default DropDownButton;
