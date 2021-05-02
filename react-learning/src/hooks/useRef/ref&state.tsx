import * as React from "react";
import { useState, useRef } from "react";

function Counter() {
  const count = useRef(0);
  const [countState, setCountState] = useState(0);

  const log = () => {
    count.current++;
    console.log(count.current);
  };

  const logState = () => {
    setCountState(countState + 1);
    console.log(countState);
  };

  return (
    <>
      <button onClick={log}>ref报数{count.current}</button>
      <button onClick={logState}>state报数{countState}</button>
    </>
  );
}
