import React from 'react'

import DefaultLayout from '../layouts/default'

class HomeComponent extends React.Component {
  render () {
    return (
      <DefaultLayout title={this.props.title} user={this.props.user}>
        <div id="mount" />
      </DefaultLayout>
    )
  }
}

export default HomeComponent
