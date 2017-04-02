import React from 'react';

class Loading extends React.Component {
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  render() {
    return (
      <div className={this.props.cls}>
        <div className="mdl-spinner mdl-js-spinner is-active" />
      </div>
    );
  }
}

Loading.propTypes = {
  cls: React.PropTypes.string,
};

Loading.defaultProps = {
  cls: 'default-loading',
};

export default Loading;
