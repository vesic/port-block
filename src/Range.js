import React, { Component } from 'react';

class Range extends Component {
  state = {}

  render() {
    return (
      <form>
        <div className="form-group">
          <label for="from">From</label>
          <input type="number" className="form-control" id="from" placeholder="From" />
        </div>
        <div className="form-group">
          <label for="to">To</label>
          <input type="number" className="form-control" id="to" placeholder="To" />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="udp" />
          <label className="form-check-label" for="udp">UDP</label>
        </div>
        <div>&nbsp;</div>
        <button type="submit" className="btn btn-primary">Bind Ports</button>
      </form>
    )
  }
}

export default Range;