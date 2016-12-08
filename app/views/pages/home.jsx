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
    roles: React.PropTypes.arrayOf(React.PropTypes.string),
  }),
};

export default HomeComponent;
