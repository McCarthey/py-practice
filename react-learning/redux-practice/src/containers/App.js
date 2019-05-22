import React, { Component } from 'react';
import Picker from '../components/Picker'

class App extends Component {

  handleChange = value => {

  }

  render() {
    const {  } = this.props
    return (
      <div>
        <Picker value={} onChange={this.handleChange} options={['Batman', 'Marvel']} />
      </div>
    )
  }
}