import React, { PropTypes } from 'react';

import DefaultLayout from '../layouts/default';

function AuthComponent(props) {
  return (
    <DefaultLayout title={props.title}>
      <div id="mount" />
    </DefaultLayout>
  );
}

AuthComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AuthComponent;
