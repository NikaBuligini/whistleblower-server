import React from 'react';
import DefaultLayout from '../layouts/default';

function ProjectsComponent(props) {
  return (
    <DefaultLayout title={props.title} user={props.user}>
      <div id="mount" />
    </DefaultLayout>
  );
}

ProjectsComponent.propTypes = {
  title: React.PropTypes.string.isRequired,
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
    roles: React.PropTypes.arrayOf(React.PropTypes.string),
  }),
};

export default ProjectsComponent;
