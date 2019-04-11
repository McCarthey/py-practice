import * as React from "react";
import { useState } from 'react'
import * as ReactDOM from "react-dom";

function App() {
  const [obj, setObject] = useState({
    count: 0,
    name: "test"
  });
  return (
    <div className="App">
      Count: {obj.count}
      <button onClick={() => setObject({ ...obj, count: obj.count + 1 })}>
        +
      </button>
      <button onClick={() => setObject({ ...obj, count: obj.count - 1 })}>
        -
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
