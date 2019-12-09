import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useRef } from "react";

/**
 * useRef不仅可以用于保存dom节点的引用，也可以保存一个状态，官方的定义是：
 * useRef 返回一个可变的 ref 对象，其 current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。
 * 因此，ref 对象可以确保在整个生命周期中值不变，且同步更新，是因为 ref 的返回值始终只有一个实例，所有读写都指向它自己。
 */
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
