import React, { Component } from 'react';
import Log from './Log';
import Table from './Table';

class Info extends Component {
  state = {}

  render() {
    return (
      <div className="row">
        <div className="col">
          <Log logs={this.props.logs}/>
        </div>
        <div className="col-9">
          <Table />
        </div>
      </div>
    )
  }
}

export default Info;