import * as React from "react";
import * as ReactDOM from "react-dom";

interface DialogState {
  status: number;
}

class Dialog extends React.Component<any, DialogState> {
  constructor(props: any) {
    super(props);
    this.state = {
      status: 0
    };
  }

  alert() {
    this.setState({ status: 1 });
  }

  close() {
    this.setState({ status: 0 });
  }

  render() {
    return <div>
        {this.state.status ?
            <div style={{position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%) translateY(-50%)',width: '480px', height: '160px', backgroundColor: '#ccc'}}>
        Dialog</div>: '' }
    </div>;
  }
}

class Home extends React.Component {
  dialog: any;
  constructor(props: any) {
    super(props);
    setTimeout(() => {
      this.dialog.alert();
    }, 1000);

    setTimeout(() => {
      this.dialog.close();
    }, 8000);
  }

  render() {
    return (
      <Dialog
        ref={dialog => {
          this.dialog = dialog;
        }}
      />
    );
  }
}

ReactDOM.render(<Home />, document.getElementById("app"));
