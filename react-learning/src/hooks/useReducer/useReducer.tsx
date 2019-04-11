import * as React from "react";
import * as ReactDOM from "react-dom";
import { useReducer } from "react";
import '../style.scss'

const initialState = { count: 0 };

function reducer(state: any, action: any) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="count-wrap">
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment", payload: 1 })}>
        +
      </button>
      <button onClick={() => dispatch({ type: "decrement", payload: 1 })}>
        -
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
