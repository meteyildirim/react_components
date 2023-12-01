import React, { useEffect, useRef } from "react";

const Dialog = ({ title, information, buttons, dialog, setDialog }) => {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    dialogRef.current.focus();

    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        handleClose(); // Close dialog on ESC key press
      } else if (event.keyCode === 13) {
        handleLeftButtonClick(); // Trigger left button click on Enter key press
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    dialogRef.current.style.display = "none";
  };

  const handleLeftButtonClick = () => {
    if (buttons.left) {
      alert(`Clicked ${buttons.left}`);
    }
  };

  const handleRightButtonClick = () => {
    if (buttons.right) {
      alert(`Clicked ${buttons.right}`);
    }
  };

  return (
    <div
      ref={dialogRef}
      tabIndex="0"
      style={{
        display: dialog,
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "25%",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        zIndex: "9999",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleClose}
          ref={closeBtnRef}
          onMouseOver={() => {
            closeBtnRef.current.style.backgroundColor = "grey";
          }}
          onMouseOut={() => {
            closeBtnRef.current.style.backgroundColor = "transparent";
          }}
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontSize: "30px",
            outline: "none",
          }}
        >
          &times;
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>{title}</h2>
      </div>
      <p>{information}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {buttons.left && (
          <button
            onClick={handleLeftButtonClick}
            style={{
              marginRight: "10px",
              backgroundColor: "blue",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            {buttons.left}
          </button>
        )}
        {buttons.right && (
          <button
            onClick={handleRightButtonClick}
            style={{
              padding: "8px 16px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            {buttons.right}
          </button>
        )}
      </div>
    </div>
  );
};

export default Dialog;
