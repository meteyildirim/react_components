import React, { useState } from "react";
import Dialog from "./DialogII/DialogII.jsx";
import "font-awesome/css/font-awesome.min.css";

const App = () => {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const action1 = () => {
    console.log("action1");
    closeDialog();
  };

  const action2 = () => {
    console.log("action2");
    closeDialog();
  };

  const action3 = () => {
    setShowDialog(false);
    closeDialog();
  };

  const content = (
    <>
      <i className="fa fa-spinner fa-spin"></i>
      <span style={{ marginLeft: "2rem" }}>{"Info text"}</span>
    </>
  );

  const dialogButtons = [
    { text: "Yes", action: action1 },
    { text: "No", action: action2 },
    { text: "Cancel", action: action3 },
  ];

  return (
    <div>
      <button
        onClick={showDialog ? closeDialog : openDialog}
        disabled={showDialog}
      >
        Run Dialog
      </button>
      {showDialog && (
        <Dialog
          title="Delete template"
          content={content}
          buttons={dialogButtons}
          onClose={closeDialog}
        />
      )}
    </div>
  );
};

export default App;
