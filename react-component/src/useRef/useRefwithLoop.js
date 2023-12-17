import React, { createRef, useRef } from "react";
import { renderToString } from "react-dom/server";

const UseRefwithLoop = ({ buttonData }) => {
  const myRefs = useRef([]);
  myRefs.current = buttonData.map(
    (element, i) => myRefs.current[i] ?? createRef()
  );

  const buttonsLEles = buttonData.map((ele, idx) => {
    return (
      <button key={idx} ref={myRefs.current[idx]} id={ele.name}>
        {ele.name}
      </button>
    );
  });
  return (
    <>
      <p>Buttons</p>
      {buttonsLEles}
    </>
  );
};

export default UseRefwithLoop;
