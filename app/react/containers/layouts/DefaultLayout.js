import React from 'react';
import { Link } from 'react-router';
import Navigation from './Navigation';
import Footer from './Footer';

type DrawerProps = {
  roles: Array<string>,
}

const Drawer = ({ roles }: DrawerProps) => (
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

type LayoutProps = {
  name: string,
  roles: Array<string>,
  children: any,
}

const Layout = ({ name, roles, children }: LayoutProps) => {
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

export default Layout;
