import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render () {
    return (
      <div>
        <ul className='monitor-list'>
          <li>Free memory: 2.3 GB</li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) { return {} }

export default connect(mapStateToProps, {})(Dashboard)
