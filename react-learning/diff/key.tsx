import React, { useState } from "react";
import { produce } from "immer";
// 实验测试 索引作为 key 的弊端

const TestKey = () => {
  const [list, setList] = useState<any[]>([
    { id: 0, name: "" },
    { id: 1, name: "" },
    { id: 2, name: "" },
  ]);

  return (
    <>
      {list.map((l, i) => (
        // key 不要使用数组索引！此处可以使用 l.id
        <div key={i}>
          <span>{l.id}</span>
          <input defaultValue="hi" />
          <button
            onClick={() => {
              setList(
                produce(list, (draft) => {
                  draft.splice(i, 1);
                })
              );
            }}
          >
            delete
          </button>
        </div>
      ))}
    </>
  );
};

export default TestKey;
