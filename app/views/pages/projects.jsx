import React from 'react';
import DefaultLayout from '../layouts/default';

function ProjectsComponent(props) {
  return (
    <DefaultLayout title={props.title}>
      <div id="mount" />
    </DefaultLayout>
  );
}

ProjectsComponent.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default ProjectsComponent;
