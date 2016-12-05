import React, { Component } from 'react';
import { Link } from 'react-router';

const Navigation = () => (
  <header className="mdl-layout__header mdl-layout__header--scroll mdl-shadow--2dp">
    <div className="mdl-layout__header-row">
      <div className="mdl-layout-spacer" />
      <nav className="mdl-navigation">
        <Link to={'/auth'} className="mdl-navigation__link">
          Login
        </Link>
        <Link to={'/auth/sign-up'} className="mdl-navigation__link">
          Sign Up
        </Link>
      </nav>
    </div>
  </header>
);

export default class Layout extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout">
        <Navigation />
        <main className="mdl-layout__content">
          <div className="mdl-snackbar mdl-js-snackbar">
            <div className="mdl-snackbar__text" />
            <button type="button" className="mdl-snackbar__action" />
          </div>
          {this.props.children}
        </main>
      </div>
    );
  }
}
