import React, { Component } from 'react'

class Navigation extends Component {
  render () {
    return (
      <nav className='navigation'>
        <div className='navigation-container'>
          <div className='navigation-content'>
            eLoan
          </div>
        </div>
      </nav>
    )
  }
}

export default class Layout extends Component {
  render () {
    return (
      <div>
        <Navigation />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
