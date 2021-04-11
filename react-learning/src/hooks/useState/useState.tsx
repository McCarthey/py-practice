import * as React from "react";
import { useState } from "react";
import * as ReactDOM from "react-dom";

function App() {
  const [obj, setObject] = useState({
    count: 0,
    name: "test",
  });

  // 当使用 Set Map 时，需要根据旧值重新生成新值，操作后再设置状态
  const [currentUAs, setCurrentUAs] = useState<Set<string>>(new Set());
  const handleClickUA = (name: string) => {
    if (currentUAs.has(name)) {
      const newData = new Set(currentUAs);
      newData.delete(name);
      setCurrentUAs(newData);
    } else {
      setCurrentUAs(new Set(currentUAs).add(name));
    }
  };

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

function CountBtn() {
  const [count, setCount] = useState(() => {
    const initialValue = (function () {
      let i = 0;
      while (i < 200) {
        i++;
      }
      return 1;
    })();
    return initialValue;
  });

  return (
    <div className="App">
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {/* 调用 State Hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。（React 使用 Object.is 比较算法 来比较 state。） */}
      <button onClick={() => setCount(count)}>{count}</button> 
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
