import * as React from "react";
import * as ReactDOM from "react-dom";
import { useContext } from "react";

const colorContext = React.createContext("gray");

function Bar() {
  const color = useContext(colorContext);
  return <div>{color}</div>;
}

function Foo() {
  return <Bar />;
}

function App() {
  return (
    <colorContext.Provider value={"red"}>
      <Foo />
    </colorContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
