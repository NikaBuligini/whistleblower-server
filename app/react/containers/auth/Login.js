import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

class Login extends Component {
  render () {
    return (
      <DocumentTitle title='Login'>
        <div className='mdl-grid'>
          <div className='mdl-cell mdl-cell--10-col mdl-cell--1-offset'>
            Login
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {};
}

export default connect(mapStateToProps, {})(Login)
