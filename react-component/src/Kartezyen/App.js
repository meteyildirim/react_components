import React from "react";
import ReactDOM from "react-dom";

import CoordinateSystem from "./CoordinateSystem";
import HorizontalLine from "./line";

const App = () => {
  return (
    <>
      <div
        className="App"
        style={{ top: "16%", left: "16%", position: "fixed" }}
      >
        <HorizontalLine x={100} y={100} />
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
