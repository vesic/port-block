import React, { Component } from 'react';
import moment from 'moment';

class Table extends Component {
  state = {}

  render() {
    const { ports, onDelete, closeAll } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col">
            <h5>Process Table</h5>
          </div>
          <div className="col">
            <button onClick={closeAll} 
              className="btn btn-sm bt-default">Kill All</button>
          </div>
        </div>
        <table style={{ marginTop: 15 }} className="table table-sm table-dark table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Protocol</th>
              <th scope="col">Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              ports.map(port => (<tr key={Math.random()}>
                <td>{port.number}</td>
                <td>{port.protocol}</td>
                <td>{moment(port.time).format("HH:mm:ss")}</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => onDelete(port)}>delete</button></td>
              </tr>))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table;