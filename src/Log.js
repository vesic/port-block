import React, { Component } from 'react';

class Log extends Component {
  state = {}

  render() {
    const { logs, clearLog } = this.props;
    if (!logs.length) {
      return (
        <div>
          <div className="row">
            <div className="col">
              <h5>Logs</h5>
            </div>
            <div className="col">
              <button onClick={clearLog}
                className="btn btn-sm bt-default">Clear Log</button>
            </div>
          </div>
          <ul style={{ marginTop: 15 }} className="list-group list-group-flush">
            <li className="list-group-item">No logs...</li>
          </ul>
        </div>
      )
    }
    return (
      <div>
        <div className="row">
          <div className="col">
            <h5>Logs</h5>
          </div>
          <div className="col">
            <button onClick={clearLog} 
              className="btn btn-sm bt-default">Clear Log</button>
          </div>
        </div>
        <ul style={{ marginTop: 15 }} className="list-group list-group-flush">
          { logs.map(log => {
            return <li key={Math.random()} className={"list-group-item " + (log.status === 'error' ? 'list-group-item-danger' : 'list-group-item-light')}>{log.text}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default Log;