import React, { Component } from 'react'

import DefaultLayout from '../layouts/default'

class AuthComponent extends Component {
  render () {
    return (
      <DefaultLayout title={this.props.title}>
        <div id="mount" />
      </DefaultLayout>
    )
  }
}

export default AuthComponent
