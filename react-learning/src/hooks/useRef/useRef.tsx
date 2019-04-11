import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useRef } from "react";

function App() {
  let [name, setName] = useState("Ryan");

  let nameRef = useRef(null);

  const submitButton = () => {
    if (nameRef.current) {
      setName(nameRef.current.value);
    }
  };

  return (
    <div className="app">
      <p>{name}</p>
      <div>
        <input ref={nameRef} type="text" />
        <button type="button" onClick={submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
