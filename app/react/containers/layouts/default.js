import React from 'react'

export default React.createClass({
  render () {
    return (
      <div>
        Layout
        {this.props.children}
      </div>
    )
  }
})
