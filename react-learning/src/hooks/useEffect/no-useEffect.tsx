import * as React from "react";
import * as ReactDOM from "react-dom";

class App extends React.Component {
  state = {
    count: 1
  };
  timer: any = null;
  componentDidMount() {
    const { count } = this.state;
    document.title = "ComponentDidMount " + count;
    this.timer = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  }
  componentDidUpdate() {
    const { count } = this.state;
    document.title = "ComponentDidMount " + count;
  }
  componentWillUnmount() {
    document.title = "ComponentWillUnmount";
    clearInterval(this.timer);
  }
  render() {
    const { count } = this.state;
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={() => clearInterval(this.timer)}>Clear</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
