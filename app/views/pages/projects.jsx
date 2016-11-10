import React from 'react'

import DefaultLayout from '../layouts/default'

class ProjectsComponent extends React.Component {
  render () {
    return (
      <DefaultLayout title={this.props.title}>
        <div id="mount" />
      </DefaultLayout>
    )
  }
}

export default ProjectsComponent