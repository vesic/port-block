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
        console.log('res:del', res)
        console.log('ports', ports)
        this.setState({
          logs: [{
            text: res.data,
            status: 'success'
          }, ...logs],
          ports: ports.filter(port => (port.number != portNumber || port.protocol != 'TCP'))
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
          ports: ports.filter(port => (port.number != portNumber || port.protocol != 'UDP'))
        });
      })
  }

  onCloseAll = () => {
    const { logs, ports } = this.state;
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

  render() {
    const { logs, ports } = this.state;
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
              {(this.state.displayRange) ? <Range /> : <Single onSubmit={this.bindPort}/>}
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
