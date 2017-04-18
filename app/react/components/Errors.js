// @flow

import React from 'react';

type Props = {
  data: Array<string>,
}

const Errors = ({ data }: Props) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <div className="error-list">
      {data.map((message, index) => <span key={index}>{message}</span>)}
    </div>
  );
};

export default Errors;
