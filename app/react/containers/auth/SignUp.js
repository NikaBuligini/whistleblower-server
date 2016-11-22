import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

class SignUp extends Component {
  componentDidMount () {
    componentHandler.upgradeDom();
  }

  render () {
    return (
      <DocumentTitle title='SignUp'>
        <div className='mdl-grid'>
          <div className='mdl-cell mdl-cell--10-col mdl-cell--1-offset'>
            <form action='#' className='mdl-cell mdl-cell--4-col'>
              <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
                <input className='mdl-textfield__input' type='text' id='username' />
                <label className='mdl-textfield__label' htmlFor='username'>Username</label>
              </div>
              <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
                <input className='mdl-textfield__input' type='password' id='password' />
                <label className='mdl-textfield__label' htmlFor='password'>Password</label>
              </div>
              <div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label'>
                <input className='mdl-textfield__input' type='passwordConf' id='password' />
                <label className='mdl-textfield__label' htmlFor='passwordConf'>Confirm Password</label>
              </div>
              <button
                type='submit'
                className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'
              >
                Sign Up
              </button>
            </form>
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
