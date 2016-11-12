import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render () {
    let { memory } = this.props;

    return (
      <div className='mdl-grid'>
        <div className='mdl-cell mdl-cell--10-col mdl-cell--1-offset'>
          {this.props.params.projectName}
          <p>Available: {memory.available}</p>
          <p>Free: {memory.free}</p>
          <p>Total: {memory.total}</p>
        </div>
      </div>
    )
  }
}

function formatBytes (bytes, decimals) {
  if (bytes == 0) return '0 Byte';
  var k = 1000; // or 1024 for binary
  var dm = decimals + 1 || 3;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function mapStateToProps (state, ownProps) {
  let { memory } = state;
  Object.keys(memory).map((key, index) => {
    memory[key] = formatBytes(memory[key], 1);
  })
  return { memory };
}

export default connect(mapStateToProps, {})(Dashboard)
