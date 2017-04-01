import React from 'react';
import DefaultLayout from '../layouts/default';

function ServiceComponent(props) {
  return (
    <DefaultLayout title={props.title} user={props.user}>
      <div id="mount" />
    </DefaultLayout>
  );
}

ServiceComponent.propTypes = {
  title: React.PropTypes.string.isRequired,
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
    roles: React.PropTypes.arrayOf(React.PropTypes.string),
  }),
};

ServiceComponent.defaultProps = {
  user: {},
};

export default ServiceComponent;
