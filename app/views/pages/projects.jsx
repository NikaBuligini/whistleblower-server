import React, { PropTypes } from 'react';
import DefaultLayout from '../layouts/default';

function ProjectsComponent(props) {
  return (
    <DefaultLayout title={props.title}>
      <div id="mount" />
    </DefaultLayout>
  );
}

ProjectsComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ProjectsComponent;
