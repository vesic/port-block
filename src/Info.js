import React, { Component } from 'react';
import Log from './Log';
import Table from './Table';

class Info extends Component {
  state = {}

  render() {
    const { logs, ports, onDelete } = this.props;
    return (
      <div className="row">
        <div className="col">
          <Log logs={logs}/>
        </div>
        <div className="col-9">
          <Table ports={ports} onDelete={onDelete}/>
        </div>
      </div>
    )
  }
}

export default Info;