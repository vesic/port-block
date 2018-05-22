import React, { Component } from 'react';
import Port from './Port';
import PortRange from './PortRange';
import './App.css';


class App extends Component {
  state = {
    ports: [],
    portRange: false
  }

  componentDidMount() {
  }


  bindTcp = (e, port) => {
    // console.log('port', this.inputTcp.value)
    fetch('/bind/' + this.inputTcp.value)
      .then(res => res.json())
      .then(res => {
        console.log('res', res)
        this.setState({ports: [...this.state.ports, res]})
      })
  }

  bindTcpRange = () => {
    [5000, 5001, 5002, 5003, 5004, 5005].forEach(port => {
      fetch('/bind/' + port)
        .then(res => res.json())
        .then(res => {
          console.log('res', res)
          this.setState({ports: [...this.state.ports, res]})
        })
    })
  }


  onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-light bg-light">
          <span class="navbar-brand mb-0 h1">Navbar</span>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <button type="button" onClick={() => this.setState({ portRange: false })} className="btn btn-primary btn-sm">Small button</button>
              <button type="button" onClick={() => this.setState({ portRange: true })} className="btn btn-secondary btn-sm">Small button</button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              { (this.state.portRange) ? <PortRange /> : <Port /> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
