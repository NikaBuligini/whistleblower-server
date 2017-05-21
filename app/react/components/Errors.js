// @flow

import React from 'react';
import styled from 'styled-components';

const ErrorList = styled.div`
  display: block;
  padding: 12px 0;
  color: rgb(244, 67, 54);
`;

const Errors = ({ data }: { data: Array<string> }) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <ErrorList>
      {data.map((message, index) => <span key={index}>{message}</span>)}
    </ErrorList>
  );
};

export default Errors;
