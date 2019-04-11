import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "../style.scss";

let timer: any = null;
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = "componentDidMount " + count; 
  }, [count]); // 一旦count值发生变化，就修改document.title

  useEffect(() => {
    timer = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);
    return () => {
      document.title = "componentWillUnmount";
      clearInterval(timer);
    };
  }, []); // 不传值代表不监听任何参数变化，即只有在组件初始化或销毁时才触发，代替componentDidMount和componentWillUnmount

  return (
    <div className="count-wrap">
      <p>Count: {count}</p>
      <button onClick={() => clearInterval(timer)}>Clear</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
