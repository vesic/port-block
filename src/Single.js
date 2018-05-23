import React, { Component } from 'react';

class Single extends Component {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.input.value, this.udp.checked)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="port-number">Port Number</label>
          <input ref={(input) => this.input = input}
            type="number"
            className="form-control" 
            id="port-number" 
            placeholder="Enter port number" />
        </div>
        <div className="form-check">
          <input ref={(input) => this.udp = input} type="checkbox" className="form-check-input" id="udp" />
          <label className="form-check-label" htmlFor="udp">UDP</label>
        </div>
        <div>&nbsp;</div>
        <button type="submit" className="btn btn-primary">Bind Port</button>
      </form>
    )
  }
}

export default Single;