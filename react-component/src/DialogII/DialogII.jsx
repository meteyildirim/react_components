import React, { useEffect, useRef } from "react";

const Dialog = ({ title, content, buttons, onClose }) => {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    dialogRef.current.focus();

    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        onClose();
      } else if (event.keyCode === 13) {
        handleLeftButtonClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  const MouseOn = () => {};

  const MouseOut = () => {};

  const handleLeftButtonClick = () => {
    if (buttons.length > 0) {
      document.getElementById("0").click();
      onClose();
    }
  };

  const buttonElements = buttons.map((button, index) => (
    <button
      key={index}
      id={index}
      
      onClick={button.action}
      onMouseOver={(e) => {
        document.getElementById(index).style.backgroundColor = "red";
      }}
      onMouseOut={(e) => {
        document.getElementById(index).style.backgroundColor = "black";
      }}
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "8px 16px",
        border: "none",
        borderRadius: "3px",
        margin: "0 5px",
        cursor: "pointer",
        width: "5rem",
      }}
    >
      {button.text}
    </button>
  ));

  const handleMouseOver = () => {
    closeBtnRef.current.style.backgroundColor = "#ccc";
  };

  const handleMouseOut = () => {
    closeBtnRef.current.style.backgroundColor = "transparent";
  };

  return (
    <div
      ref={dialogRef}
      tabIndex="0"
      style={{
        display: "block",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "30%",
        backgroundColor: "#fff",
        padding: "0",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        zIndex: "9999",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f5f5f5",
          padding: "10px 20px",
          borderRadius: "5px 5px 0 0",
          margin: "0",
          width: "auto",
        }}
      >
        <span style={{ margin: "0", fontSize: "17px" }}>{title}</span>
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          onMouseOver={null}
          onMouseOut={null}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "30px",
            outline: "none",
            fontWeight: "lighter",
          }}
        >
          &times;
        </button>
      </div>
      <div
        style={{
          padding: "0",
          backgroundColor: "#fff",
          margin: "2rem",
          dispay: "inline-flex",
        }}
      >
        {content}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          borderTop: "none",
          margin: "0",
          backgroundColor: "#f5f5f5",
        }}
      >
        {buttonElements}
      </div>
    </div>
  );
};

export default Dialog;
