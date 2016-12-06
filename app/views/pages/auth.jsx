import React from 'react';

import DefaultLayout from '../layouts/default';

function AuthComponent(props) {
  return (
    <DefaultLayout title={props.title}>
      <div id="mount" />
    </DefaultLayout>
  );
}

AuthComponent.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default AuthComponent;
