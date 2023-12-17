import ReactDOM from "react-dom";

import UseRefwithLoop from "./useRefwithLoop";
import UseRefasanID from "./useRefasanID";
const buttons = [
  { name: "Button 1", action: () => console.log("Button 1 action") },
  { name: "Button 2", action: () => console.log("Button 2 action") },
  { name: "Button 3", action: () => console.log("Button 3 action") },
  // Add more buttons as needed
];

const App = () => {
  return (
    <div className="App" style={{ top: "50%", left: "50%", position: "fixed" }}>
      {/* <UseRefwithLoop buttonData={buttons} /> */}
      <UseRefasanID />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
