import React, { Component } from 'react';

class Single extends Component {
  state = {}

  render() {
    return (
      <form>
        <div className="form-group">
          <label for="port-number">Port Number</label>
          <input className="form-control" id="port-number" placeholder="Enter port number" />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="udp" />
          <label className="form-check-label" for="udp">UDP</label>
        </div>
        <div>&nbsp;</div>
        <button type="submit" className="btn btn-primary">Bind Port</button>
      </form>
    )
  }
}

export default Single;