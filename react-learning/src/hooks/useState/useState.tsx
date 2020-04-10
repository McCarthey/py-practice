import * as React from "react";
import { useState } from 'react'
import * as ReactDOM from "react-dom";

function App() {
  const [obj, setObject] = useState({
    count: 0,
    name: "test"
  });

  // 当使用 Set Map 时，需要根据旧值重新生成新值，操作后再设置状态
  const [currentUAs, setCurrentUAs] = useState<Set<string>>(new Set())
  const handleClickUA = (name: string) => {
    if (currentUAs.has(name)) {
      const newData = new Set(currentUAs);
      newData.delete(name);
      setCurrentUAs(newData);
    } else {
      setCurrentUAs(new Set(currentUAs).add(name))
    }
  }

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
