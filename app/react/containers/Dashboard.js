import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render () {
    return (
      <div>
        asd
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) { return {} }

export default connect(mapStateToProps, {})(Dashboard)
