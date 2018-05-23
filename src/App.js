import React, { Component } from 'react';
import Single from './Single';
import Range from './Range';
import Info from './Info';
import './App.css';


class App extends Component {
  state = {
    ports: [],
    displayRange: false
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
          <span class="navbar-brand mb-0 h1">Port Block</span>
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
              {(this.state.displayRange) ? <Range /> : <Single />}
            </div>
          </div>
          <Info />
        </div>
      </div>
    );
  }
}

export default App;
