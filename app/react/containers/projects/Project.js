import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Project extends Component {
  render () {
    return (
      <div className='mdl-grid'>
        <div className='mdl-cell mdl-cell--10-col mdl-cell--1-offset'>
          {this.props.params.projectName}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {};
}

export default connect(mapStateToProps, {

})(Project)
