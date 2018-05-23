import React, { Component } from 'react';
import Log from './Log';
import Table from './Table';

class Info extends Component {
  state = {}

  render() {
    const { logs, ports, onDelete, clearLog, closeAll } = this.props;
    return (
      <div className="row">
        <div className="col">
          <Log logs={logs} clearLog={clearLog}/>
        </div>
        <div className="col-9">
          <Table ports={ports} onDelete={onDelete} closeAll={closeAll}/>
        </div>
      </div>
    )
  }
}

export default Info;