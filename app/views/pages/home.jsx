import React from 'react';
import DefaultLayout from '../layouts/default';

function HomeComponent(props) {
  return (
    <DefaultLayout title={props.title}>
      <div id="mount" />
    </DefaultLayout>
  );
}

HomeComponent.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default HomeComponent;
