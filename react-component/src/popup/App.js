import ReactDOM from "react-dom";

import WordExplanation from "./WordExplanation";

const text = ` MOSCOW (AP) — Russian President Vladimir Putin said Thursday there would be no peace in Ukraine until the Kremlin realizes its goals, which remain unchanged after nearly two years of fighting that has sent tensions soaring between Moscow and the West.

Speaking at a year-end news conference that lasted over four hours and offered him an opportunity to reinforce his grip on power, Putin gave some rare details on what Moscow calls its “special military operation.”

He dismissed the need for a second wave of mobilization of reservists to fight in Ukraine — a move that has been deeply unpopular. He said there are some 617,000 Russian soldiers there, including around 244,000 troops who were called up to fight alongside professional military forces.`;

const App = () => {
  return (
    <div className="App" style={{ top: "50%", left: "50%", position: "fixed" }}>
      <WordExplanation text={text} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
