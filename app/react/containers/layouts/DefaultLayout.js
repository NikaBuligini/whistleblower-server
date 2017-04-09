import React from 'react';
import { Link } from 'react-router';
// import { connect } from 'react-redux';
import Navigation from './Navigation';
import Footer from './Footer';

const Drawer = (props) => {
  const { roles } = props;
  return (
    <div className="mdl-layout__drawer">
      <span className="mdl-layout-title">Whistleblower</span>
      <nav className="mdl-navigation">
        <Link to={'/'} className="mdl-navigation__link">Dashboard</Link>
        {roles.indexOf('admin') !== -1 && (
          <Link to={'/projects'} className="mdl-navigation__link">Projects</Link>
        )}
      </nav>
    </div>
  );
};

Drawer.propTypes = {
  roles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

const Layout = ({ name, roles, children }) => {
  const fullname = name || 'Nikoloz Buligini';
  const viewerRoles = roles || ['admin'];
  return (
    <div className="mdl-layout mdl-js-layout">
      <Navigation name={fullname} roles={viewerRoles} />
      <Drawer roles={viewerRoles} />
      <main className="mdl-layout__content">
        <div className="mdl-snackbar mdl-js-snackbar">
          <div className="mdl-snackbar__text" />
          <button type="button" className="mdl-snackbar__action" />
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: React.PropTypes.node.isRequired,
  name: React.PropTypes.string,
  roles: React.PropTypes.arrayOf(React.PropTypes.string),
};

// function mapStateToProps(state) {
//   const { name, roles } = state.preloaded;
//   return { name, roles };
// }

export default Layout;

// export default connect(mapStateToProps, {})(Layout);
