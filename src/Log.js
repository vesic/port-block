import React, { Component } from 'react';

class Log extends Component {
  state = {}

  render() {
    const { logs } = this.props;
    return (
      <div>
        <h4>Log</h4>
        <ul className="list-group list-group-flush">
          { logs.map(log => {
            return <li className={"list-group-item " + (log.status === 'error' ? 'list-group-item-danger' : 'list-group-item-light')}>{log.text}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default Log;