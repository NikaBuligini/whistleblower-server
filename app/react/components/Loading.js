import React from 'react';

class Loading extends React.Component {
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

Loading.propTypes = {
  cls: React.PropTypes.string,
};

export default Loading;
