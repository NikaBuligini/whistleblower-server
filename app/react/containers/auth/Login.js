import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'

class Login extends Component {
  componentDidMount () {
    componentHandler.upgradeDom();
  }

  render () {
    return (
      <DocumentTitle title='Login'>
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
              <button
                type='submit'
                className='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'
              >
                Login
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

export default connect(mapStateToProps, {})(Login)
