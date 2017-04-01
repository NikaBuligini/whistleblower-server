import React from 'react';
import DefaultLayout from '../layouts/default';

function HomeComponent(props) {
  return (
    <DefaultLayout title={props.title} user={props.user}>
      <div id="mount" />
    </DefaultLayout>
  );
}

HomeComponent.propTypes = {
  title: React.PropTypes.string.isRequired,
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
    roles: React.PropTypes.arrayOf(React.PropTypes.string),
  }),
};

HomeComponent.defaultProps = {
  user: {},
};

export default HomeComponent;
