import React from 'react'

import DefaultLayout from '../layouts/default'

class HomeComponent extends React.Component {
  render () {
    return (
      <DefaultLayout title={this.props.title}>
        <div id="mount">
          Hello World!
        </div>
      </DefaultLayout>
    )
  }
}

export default HomeComponent
