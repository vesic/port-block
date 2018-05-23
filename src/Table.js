import React, { Component } from 'react';

class Table extends Component {
  state = {}

  render() {
    const { ports, onDelete } = this.props;
    return (
      <div>
        <h4>Table</h4>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Protocol</th>
              <th scope="col">Time</th>
              <th></th>
              {/* <th scope="col">Handle</th> */}
            </tr>
          </thead>
          <tbody>
            {
              ports.map(port => (<tr>
                <td>{port.number}</td>
                <td>{port.protocol}</td>
                <td>{port.time}</td>
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