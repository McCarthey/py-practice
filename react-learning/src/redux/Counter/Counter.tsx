import * as React from "react";

interface CounterProp {
  value: number;
  onIncrement?: () => any;
  onDecrement?: () => any;
}

export default class Counter extends React.Component<CounterProp> {
  incrementIfOdd = () => {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement();
    }
  };

  incrementAsync = () => {
    setTimeout(this.props.onIncrement, 1000);
  };

  render() {
    const { value, onIncrement, onDecrement } = this.props;
    return (
      <p>
        Clicked： {value} times
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
        <button onClick={this.incrementIfOdd}>increment if odd</button>
        <button onClick={this.incrementAsync}>increment async</button>
      </p>
    );
  }
}
