import React from "react";
import ReactDOM from "react-dom";
import DropDownButton from "./dropdown5";
import ReactBootstrapButton from "./dropdownwithreactbootstrap";
import PopupMenu from "./dropdown5";

const subMenuItems = [
  {
    name: "Save to template",
    onClick: () => console.log("Option 1 clicked"),
    disabled: true,
  },
  {
    name: "Save as a new template",
    onClick: () => console.log("Option 2 clicked"),
    disabled: false,
  },
];

const App = () => {
  return (
    <>
      <div className="App" style={{ display: "flex" }}>
        <DropDownButton
          items={subMenuItems}
          buttonLabel={"Save"}
          disabled={false}
        />

        <DropDownButton
          items={subMenuItems}
          buttonLabel={"Save"}
          disabled={false}
        />
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
