import React, { useState, useRef, useEffect } from "react";

const PopupMenu = ({ items, buttonLabel, classnamebtn, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [isSubMenuAbove, setIsSubMenuAbove] = useState(false);
  const subMenuRef = useRef(null);
  const mainBtnRef = useRef(null);
  const [isOpenM, setIsOpenM] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickItem = (item) => {
    handleClose();
    item.onClick();
  };

  const handleKeyDown = (event, item) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
    if (event.key === "Enter") {
      mainBtnRef.current.click();
    }
    if (event.key === "Tab" && isOpen) {
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

  const onMouseOver = (e) => {
    setIsOpenM(true);
    mainBtnRef.current.focus();
  };

  useEffect(() => {
    mainBtnRef.current.addEventListener("keydown", handleKeyDown);
    mainBtnRef.current.addEventListener("mouseover", onMouseOver);
    return () => {
      mainBtnRef.current.removeEventListener("keydown", handleKeyDown);
      mainBtnRef.current.addEventListener("mouseover", onMouseOver);
    };
  }, []);

  useEffect(() => {
    const buttonRect = mainBtnRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - buttonRect.bottom;

    if (spaceBelow < items.length * 30) {
      setIsSubMenuAbove(true);
    } else {
      setIsSubMenuAbove(false);
    }
  }, [items]);

  const styles = {
    savebutton: {
      backgroundColor: isOpenM && !disabled ? "#3a3a3a" : "#616161",
      color: "white",
      border: "none",
      padding: "10px 5px 10px",
      maxWidth: "fit-content",
      marginLeft: "auto",
      marginTop: "10px",
      borderRadius: "3px",
      outline: "none",
      minWidth: "60px",
      height: "20px !important",
      fontFamily: "Arial, Helvetica, sans-serif",
      fontSize: "1em",
      alignItems: "center",
      whiteSpace: "nowrap",
      position: "relative",
    },
  };

  return (
    <div className="popup-menu-container">
      <button
        id={"menubutton"}
        className={`${
          classnamebtn === undefined || classnamebtn === null
            ? "savebutton"
            : classnamebtn
        }`}
        style={styles.savebutton}
        onClick={() => {
          setIsOpen(!isOpen);
          handleBlur();
        }}
        disabled={disabled}
        onMouseOver={() => onMouseOver()}
        onMouseLeave={() => setIsOpenM(false)}
        onKeyDown={handleKeyDown}
        ref={mainBtnRef}
      >
        {buttonLabel}
      </button>

      {isOpen && (
        <div
          className="popup-menu"
          ref={subMenuRef}
          style={{
            marginTop: isSubMenuAbove ? `-${items.length * 55}px` : "0.1rem",
            marginLeft: "1px",
          }}
        >
          <div
            className="popupmenuitems"
            onMouseLeave={() => setIsOpen(!isOpen)}
            style={{ paddingLeft: "0px", marginRight: "120px" }}
          >
            {items.map((item, index) => (
              <button
                key={index}
                id={item.name}
                tabIndex={-1}
                disabled={item.disabled}
                style={{
                  backgroundColor: index === selectedItem ? "#fbe7e7" : "white",
                  listStyleType: "none",
                  marginLeft: "0px",
                  display: "flex",
                  padding: "5px",
                  border: "none",
                  textOverflow: "ellipsis",
                  whiteSpace: "normal",
                }}
                onMouseEnter={() => {
                  const ele = document.getElementById(item.name);
                  ele.style.backgroundColor = "#fbe7e7";
                  setSelectedItem(index);
                }}
                onMouseLeave={() => {
                  {
                    const ele = document.getElementById(item.name);
                    ele.style.backgroundColor = "white";
                  }
                }}
                onClick={() => !item.disabled && handleClickItem(item)}
                onBlur={handleBlur}
                onKeyDown={() => !item.disabled && handleKeyDown(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;
