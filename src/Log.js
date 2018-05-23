import React, { Component } from 'react';

class Log extends Component {
  state = {}

  render() {
    return (
      <div>
        <h4>Log</h4>
        <ul className="list-group list-group-flush">
          {
            this.props.logs.map(log => {
              return <li className="list-group-item">{log}</li>
            })
          }
{/*           
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Morbi leo risus</li>
          <li className="list-group-item">Porta ac consectetur ac</li>
          <li className="list-group-item">Vestibulum at eros</li> */}
        </ul>
      </div>
    )
  }
}

export default Log;