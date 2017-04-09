// @flow

import React from 'react';

type Props = {
  name: string,
  placeholder: string,
  onChange: () => void,
  type: string,
  value: string,
  className: ?string,
}

type DefaultProps = {
  type: string,
  className: ?string,
}

class Input extends React.Component {
  static defaultProps: DefaultProps;

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    type: React.PropTypes.string,
    value: React.PropTypes.string,
    className: React.PropTypes.string,
  }

  static defaultProps = {
    type: 'text',
    className: '',
    value: '',
  }

  onChange: () => void;

  props: Props;

  render() {
    const { onChange, value, name, placeholder, className, type } = this.props;

    let cls = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label';
    if (className) {
      cls += ` ${className}`;
    }

    return (
      <div className={cls}>
        <input
          className="mdl-textfield__input"
          type={type}
          id={name}
          name={name}
          autoComplete="off"
          onChange={onChange}
          value={value}
        />
        <label className="mdl-textfield__label" htmlFor={name}>{placeholder}</label>
      </div>
    );
  }
}

export default Input;
