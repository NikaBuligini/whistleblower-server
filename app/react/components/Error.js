// @flow

import React from 'react';

type Props = {
  text: string,
}

const Error = (props: Props) => (
  <div className="error">
    <span>{props.text}</span>
  </div>
 );

Error.propTypes = {
  text: React.PropTypes.string.isRequired,
};

export default Error;
