import React from "react";
import ReactDOM from "react-dom";
import DropDownButton from "./dropdown2";

const subMenuItems = [
  { name: "Option 1", onClick: () => console.log("Option 1 clicked") },
  { name: "Option 2", onClick: () => console.log("Option 2 clicked") },
  { name: "Option 3", onClick: () => console.log("Option 3 clicked") },
];

const App = () => {
  return (
    <div className="App" style={{ top: "80%", left: "50%", position: "fixed" }}>
      <DropDownButton buttonName="Save" subMenuItems={subMenuItems} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
