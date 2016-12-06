import React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

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

class SignUp extends React.Component {
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  render() {
    return (
      <DocumentTitle title="SignUp">
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--10-col mdl-cell--1-offset">
            <form
              method="post"
              action="/auth/sign-up"
              className="mdl-cell mdl-cell--4-col"
            >
              <Input text="Fullname" id="fullname" type="text" />
              <Input text="Email" id="email" type="text" />
              <Input text="Password" id="password" type="password" />
              <Input text="Confirm Password" id="passwordConf" type="password" />
              <button
                type="submit"
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {})(SignUp);
