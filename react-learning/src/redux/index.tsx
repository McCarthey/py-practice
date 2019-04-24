import * as React from "react";
import * as ReactDOM from "react-dom";
import Counter from "./Counter";
import counter from "./reducers/counter";
import { createStore } from "redux";

const store = createStore(counter);

const render = () =>
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: "INCREMENT" })}
      onDecrement={() => store.dispatch({ type: "DECREMENT" })}
    />,
    document.getElementById("app")
  );

render()
store.subscribe(render)