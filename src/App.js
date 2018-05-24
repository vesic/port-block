import React, { Component } from 'react';
import Single from './Single';
import Range from './Range';
import Info from './Info';
import './App.css';

class App extends Component {
  state = {
    logs: [],
    ports: [],
    displayRange: false
  }

  componentDidMount() {
    fetch('/all-ports')
      .then(res => res.json())
      .then(res => {
        this.setState({
          ports: res.ports
        })
      })
  }

  sortOut = (arr) => {
    const { logs, ports } = this.state;    
    if (arr[0] !== 'error') {
      this.setState({
        logs: [{
          text: arr.join(' '),
          status: 'success'
        }, ...logs],
        ports: [...ports, {
          number: arr[1],
          protocol: arr[0],
          time: Date.now()
        }]
      })
    } else {
      this.setState({
        logs: [{
          text: arr.slice(1).join(' '),
          status: 'error'
        }, ...logs]
      })
    }
  }

  bindUDP = (port) => {
    fetch('/bind-udp/' + port)
      .then(res => res.json())
      .then(res => {
        this.sortOut(res.data.split(' '))
      })
  }

  bindTCP = (port) => {
    fetch('/bind/' + port)
      .then(res => res.json())
      .then(res => {
        this.sortOut(res.data.split(' '))
      })
  }

  bindPort = (port, udp) => {
    (udp) ? this.bindUDP(port) : this.bindTCP(port);
  }
  
  onDelete = (port) => {
    const { number, protocol } = port;
    (protocol === 'TCP') 
      ? this.killTCP(number) 
      : this.killUDP(number);
  }

  killTCP = (portNumber) => {
    const { logs, ports } = this.state;    
    fetch('/kill-tcp/' + portNumber)
      .then(res => res.json())
      .then(res => {
        this.setState({
          logs: [{
            text: res.data,
            status: 'success'
          }, ...logs],
          ports: ports.filter(port => (port.number !== portNumber || port.protocol !== 'TCP'))
        });
      })
  }

  killUDP = (portNumber) => {
    const { logs, ports } = this.state;    
    fetch('/kill-udp/' + portNumber)
      .then(res => res.json())
      .then(res => {
        this.setState({
          logs: [{
            text: res.data,
            status: 'success'
          }, ...logs],
          ports: ports.filter(port => (port.number !== portNumber || port.protocol !== 'UDP'))
        });
      })
  }

  onCloseAll = () => {
    const { logs } = this.state;
    fetch('/kill-all')
      .then(res => res.json())
      .then(res => {
        this.setState({
          logs: [{
            text: res.data,
            status: 'success'
          }, ...logs],
          ports: []
        })
      })
  }

  bindRange = (from, to, udp) => {
    if (!udp) {
      for (let i = from; i <= to; i++) {
        this.bindTCP(i);
      }
    } else {
      for (let i = from; i <= to; i++) {
        this.bindUDP(i);
      }
    }
  }

  render() {
    const { logs, ports, displayRange } = this.state;
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">PortBlock</span>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div>&nbsp;</div>
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a onClick={() => this.setState({ displayRange: false })} className={'nav-link ' + (!displayRange ? 'active': '')} href={null}>Single</a>
                </li>
                <li className="nav-item">
                  <a onClick={() => this.setState({ displayRange: true })} className={'nav-link ' + (displayRange ? 'active': '')} href={null}>Range</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <div>&nbsp;</div>
              {(this.state.displayRange) ? <Range onSubmit={this.bindRange} /> : <Single onSubmit={this.bindPort}/>}
            </div>
          </div>
          <hr />
          <Info logs={logs} 
            ports={ports} 
            onDelete={this.onDelete}
            clearLog={() => this.setState({ logs: []})}
            closeAll={this.onCloseAll}
          />
        </div>
      </div>
    );
  }
}

export default App;
