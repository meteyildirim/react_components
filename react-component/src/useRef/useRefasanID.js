import React, { useEffect, useRef } from "react";

const UseRefasanID = () => {
  const myRef = useRef(0); // Create a useRef object

  return (
    <div>
      {/* Example usage of the ref */}
      <div id={JSON.stringify(myRef.current)} ref={myRef}>
        My Element
      </div>
    </div>
  );
};

export default UseRefasanID;
