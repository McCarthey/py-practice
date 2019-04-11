import * as React from "react";
import * as ReactDOM from "react-dom";
import '../style.scss'

interface countProps {}
interface countState {
    count: number
    name: string
}

class App extends React.Component<countProps, countState> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
      name: "test"
    };
  }
  render() {
    const { count } = this.state;
    return (
      <div className="count-wrap">
        <p>Count: {count}</p>
        <button onClick={() => this.setState({ count: count + 1 })}>+</button>
        <button onClick={() => this.setState({ count: count - 1 })}>-</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
