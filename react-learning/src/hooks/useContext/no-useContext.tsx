import * as React from "react";
import * as ReactDOM from "react-dom";

const { Provider, Consumer } = React.createContext(null);

function Bar() {
  return <Consumer>{color => <div>{color}</div>}</Consumer>;
}

function Foo() {
  return <Bar />;
}

function App() {
  return (
    <Provider value={"grey"}>
      <Foo />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
