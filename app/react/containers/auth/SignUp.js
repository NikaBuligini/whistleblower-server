import React from 'react';
import DocumentTitle from 'react-document-title';
import Input from './Input';

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
              className="mdl-cell mdl-cell--4-col auth"
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

export default SignUp;
