import React from 'react';
import { Link } from 'react-router';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { name, roles } = this.props;
    return (
      <header className="mdl-layout__header mdl-layout__header--scroll mdl-shadow--2dp navigation">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            <Link
              to={'/'}
              className="link"
              activeClassName="active"
            >
              Dashboard
            </Link>
          </span>
          <div className="mdl-layout-spacer" />
          <nav className="mdl-navigation">
            {roles.indexOf('admin') !== -1 && (
              <Link to={'/projects'} className="mdl-navigation__link">
                Projects
              </Link>
            )}
            <div>
              <a
                className="account-icon"
                tabIndex="-1"
                onClick={() => this.setState({ isOpen: !this.state.isOpen })}
              >
                <i className="material-icons">
                  {roles.indexOf('admin') !== -1 ? 'supervisor_account' : 'account_circle'}
                </i>
              </a>
              {this.state.isOpen && (
                <div className="mdl-shadow--2dp account-actions">
                  <div className="line static">
                    <div>Signed in as</div>
                    <strong>{name}</strong>
                  </div>
                  <div className="divider" />
                  <a href="/auth/logout" className="line">
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

Navigation.propTypes = {
  name: React.PropTypes.string,
  roles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

Navigation.defaultProps = {
  name: '',
};
