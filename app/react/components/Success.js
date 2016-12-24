// @flow

import React from 'react';

type Props = {
  text: string,
}

const Success = (props: Props) => (
  <div className="success">
    <span>{props.text}</span>
  </div>
 );

Success.propTypes = {
  text: React.PropTypes.string.isRequired,
};

export default Success;
