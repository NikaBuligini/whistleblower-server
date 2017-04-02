import React from 'react';

const Input = props => (
  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <input
      className="mdl-textfield__input"
      type={props.type}
      name={props.id}
      id={props.id}
    />
    <label
      className="mdl-textfield__label"
      htmlFor={props.id}
    >
      {props.text}
    </label>
  </div>
);

Input.propTypes = {
  text: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
};

Input.defaultProps = {
  text: '',
};

export default Input;
