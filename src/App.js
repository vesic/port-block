import React, { Component } from 'react';
import Single from './Single';
import Range from './Range';
import Info from './Info';
import './App.css';


class App extends Component {
  state = {
    logs: [
      'foo'
    ],
    displayRange: false
  }

  componentDidMount() {
  }


  bindTcp = (port, udp) => {
    console.log('port', port, udp)
    fetch('/bind/' + port)
      .then(res => res.json())
      .then(res => {
        console.log('res', res)
        this.setState({ports: [...this.state.logs, res.data]})
      })
  }

  bindTcpRange = () => {
    [5000, 5001, 5002, 5003, 5004, 5005].forEach(port => {
      fetch('/bind/' + port)
        .then(res => res.json())
        .then(res => {
          console.log('res', res)
          this.setState({ports: [...this.state.logs, res]})
        })
    })
  }


  onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">Port Block</span>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div>&nbsp;</div>
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a onClick={() => this.setState({ displayRange: false })} className={'nav-link'} href="#">Single</a>
                </li>
                <li className="nav-item">
                  <a onClick={() => this.setState({ displayRange: true })} className="nav-link" href="#">Range</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <div>&nbsp;</div>
              {(this.state.displayRange) ? <Range /> : <Single onSubmit={this.bindTcp}/>}
            </div>
          </div>
          <div>&nbsp;</div>
          <Info logs={this.state.logs}/>
        </div>
      </div>
    );
  }
}

export default App;
