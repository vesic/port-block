import React, { Component } from 'react';

class Range extends Component {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.from.value, this.to.value, this.udp.checked)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="from">Port Number</label>
          <input ref={(input) => this.from = input} type="number" className="form-control" id="from" placeholder="From" />
        </div>
        <div className="form-group">
          <label htmlFor="to">Port Number</label>
          <input ref={(input) => this.to = input} type="number" className="form-control" id="to" placeholder="To" />
        </div>
        <div className="form-check">
          <input ref={(input) => this.udp = input} type="checkbox" className="form-check-input" id="udp" />
          <label className="form-check-label" htmlFor="udp">UDP</label>
        </div>
        <div>&nbsp;</div>
        <button type="submit" className="btn btn-primary">Bind Ports</button>
      </form>
    )
  }
}

export default Range;