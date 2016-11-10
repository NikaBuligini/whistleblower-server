import React, { Component } from 'react'

export default class Loading extends Component {
  render () {
    let cls = this.props.cls || 'default-loading'

    return (
      <div className={cls}>
        <svg className="spinner" viewBox="0 0 50 50">
          <circle className="path" cx="25" cy="25" r="20"
            fill="none" strokeWidth="1"></circle>
        </svg>
      </div>
    )
  }
}
