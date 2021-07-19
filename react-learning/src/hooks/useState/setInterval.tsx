import * as React from "react";
import { useState, useEffect } from "react";

export default function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("log", count, interval);
      setCount(count + 1); // NOTE: 始终为 1，需要传入回调函数的方式，使用之前的值
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>计数器为：{count}</div>;
}

/**
 * 只有在首次渲染时，传入setInterval的闭包中的回调函数才能获取到count的值，因为useEffect之后不会再调用了，所以在后续的渲染中没法拿到新的count的值。
 * 即，每次setInterval触发时，都会调用setCount(count + 1)
 * 因此，count的值始终为0
 *
 * 就像类组件的setState，state hooks有两种形式：即传入更新的值，或者传入一个参数为当前值的回调函数
 * 应当使用后者，以保证在setState回调中始终获取到最新的值
 */
