import React, { Component } from 'react';

export default class Loading extends Component {
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  render() {
    const cls = this.props.cls || 'default-loading';

    return (
      <div className={cls}>
        <div className="mdl-spinner mdl-js-spinner is-active" />
      </div>
    );
  }
}
