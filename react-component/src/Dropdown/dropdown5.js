import React, { useState, useRef, useEffect } from "react";

const PopupMenu = ({ items, buttonLabel, classnamebtn, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rigtSide, setRightSide] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [isSubMenuAbove, setIsSubMenuAbove] = useState(false);
  const subMenuRef = useRef(null);
  const mainBtnRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
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
    if (event.key === "Enter" && isOpen) {
      event.stopPropagation();
      handleClose();
      !items[selectedItem].disabled && items[selectedItem].onClick();
    }

    if (event.key === "Enter" && !isFocused) {
      event.stopPropagation();
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
    setIsFocused(true);
    mainBtnRef.current.focus();
  };

  useEffect(() => {
    const buttonRect = mainBtnRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const spaceBelow = windowHeight - buttonRect.bottom;
    setRightSide(windowWidth - buttonRect.left);

    if (spaceBelow < items.length * 30) {
      setIsSubMenuAbove(true);
    } else {
      setIsSubMenuAbove(false);
    }
  }, [items]);

  const btnMinWidth = 180;
  const btnHeight = 30;
  const submenuitemHeight = 30;

  const styles = {
    savebutton: {
      backgroundColor: isFocused && !disabled ? "#3a3a3a" : "#616161",
      color: "white",
      border: "none",
      padding: "5px",
      maxWidth: "fit-content",
      marginLeft: "10px",
      marginTop: "10px",
      borderRadius: "3px",
      outline: "none",
      minWidth: "60px",
      fontFamily: "Arial, Helvetica, sans-serif",
      fontSize: "1em",
      disabled: disabled,
      height: `${btnHeight}px`,
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
          setIsOpen(true);
          setIsFocused(false);
          handleBlur();
        }}
        disabled={disabled}
        onMouseOver={() => onMouseOver()}
        onMouseLeave={() => setIsFocused(false)}
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
            display: "block",
            position: "absolute",
            float: "left",
            // right: `${rigtSide > btnMinWidth ? 0 : btnMinWidth - rigtSide}px`,
            marginTop: isSubMenuAbove
              ? `-${
                  items.length * submenuitemHeight +
                  mainBtnRef.current.getBoundingClientRect().height
                }px`
              : "0.1rem",
            marginLeft: "8px",
          }}
        >
          <div
            className="popupmenuitems"
            onMouseLeave={() => setIsOpen(!isOpen)}
            style={{ textAlign: "right" }}
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
                  display: "block",
                  padding: "5px",
                  border: "none",
                  minWidth: `${btnMinWidth}px`,
                  height: `${submenuitemHeight}px`,
                  // textOverflow: "ellipsis",
                  // whiteSpace: "nowrap;",
                  // overflow: "hidden",
                  textAlign: "left",
                  // minWidth: "120px",
                  zIndex: "99999",
                  position: "relative",
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
