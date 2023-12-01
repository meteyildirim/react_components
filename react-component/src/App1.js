import "./App.css";
import Dialog from "./Dialog/Dialog";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const handleDialogOpen = () => {
    setDialog("block");
  };

  const [dialog, setDialog] = useState("none");

  return (
    <div>
      <button onClick={handleDialogOpen}>Open Dialog</button>
      <Dialog
        id="dialog"
        title="Delete Template"
        information="The template will be permanently deleted."
        buttons={{ left: "OK", right: "Cancel" }}
        dialog={dialog}
        setDialog={setDialog}
      />
    </div>
  );
}

export default App;
