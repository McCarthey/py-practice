import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import "../style.scss";

let timer: any = null;
function App(props: any) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }); // 为防止内存泄漏，清除函数会在组件卸载前执行；如果组件多次渲染（通常如此），则在执行下一个 effect 之前，上一个 effect 就已被清除，即先执行上一个 effect 中 return 的函数，然后再执行本 effect 中非 return 的函数。

  useEffect(() => {
    document.title = "componentDidMount " + count;
  }, [count]); // 一旦count值发生变化，就修改document.title

  useEffect(() => {
    timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
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
