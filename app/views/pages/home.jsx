import React, { PropTypes } from 'react';
import DefaultLayout from '../layouts/default';

function HomeComponent(props) {
  return (
    <DefaultLayout title={props.title}>
      <div id="mount" />
    </DefaultLayout>
  );
}

HomeComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HomeComponent;
