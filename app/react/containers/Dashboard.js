import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  formatBytes (bytes, decimals) {
    if (bytes == 0) return '0 Byte';
    var k = 1000; // or 1024 for binary
    var dm = decimals + 1 || 3;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  render () {
    let { memory } = this.props;

    Object.keys(memory).map((key, index) => {
      memory[key] = this.formatBytes(memory[key], 1);
    })

    return (
      <div>
        <ul className='monitor-list'>
          <li>Available: {memory.available}</li>
          <li>Free: {memory.free}</li>
          <li>Total: {memory.total}</li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  let { memory } = state;
  return { memory };
}

export default connect(mapStateToProps, {})(Dashboard)
