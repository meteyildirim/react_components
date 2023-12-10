import { useState } from "react";
import ReactDOM from "react-dom";
import ModalDialog from "./modal";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="App" style={{ top: "50%", left: "50%", position: "fixed" }}>
      <button onClick={() => setShowModal(!showModal)}>Show Modal</button>
      {showModal && <ModalDialog setShowModal={setShowModal} />}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
