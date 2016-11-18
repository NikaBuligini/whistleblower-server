import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

class SignUp extends Component {
  render () {
    return (
      <DocumentTitle title='SignUp'>
        <div className='mdl-grid'>
          <div className='mdl-cell mdl-cell--10-col mdl-cell--1-offset'>
            SignUp
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {};
}

export default connect(mapStateToProps, {})(SignUp)
