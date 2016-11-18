import React, { Component } from 'react'
import { Link } from 'react-router'

const Navigation = (props) => {
  return (
    <header className="mdl-layout__header mdl-layout__header--scroll mdl-shadow--2dp">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">
          <Link
            to={'/'}
            className='link'
            activeClassName='active'
          >
            Dashboard
          </Link>
        </span>
        <div className="mdl-layout-spacer" />
        <nav className="mdl-navigation">
          <Link to={'/projects'} className='mdl-navigation__link'>
            Projects
          </Link>
        </nav>
      </div>
    </header>
  );
}

const Drawer = (props) => {
  return (
    <div className="mdl-layout__drawer">
      <span className="mdl-layout-title">Whistleblower</span>
      <nav className="mdl-navigation">
        <Link to={'/'} className='mdl-navigation__link'>Home</Link>
        <Link to={'/projects'} className='mdl-navigation__link'>Projects</Link>
      </nav>
    </div>
  );
}

const Footer = (props) => {
  return (
    <footer className="mdl-mega-footer">
      <div className="mdl-mega-footer__middle-section">

        <div className="mdl-mega-footer__drop-down-section">
          <input className="mdl-mega-footer__heading-checkbox" type="checkbox" checked />
          <h1 className="mdl-mega-footer__heading">Features</h1>
          <ul className="mdl-mega-footer__link-list">
            <li><a href="#">About</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Partners</a></li>
            <li><a href="#">Updates</a></li>
          </ul>
        </div>

        <div className="mdl-mega-footer__drop-down-section">
          <input className="mdl-mega-footer__heading-checkbox" type="checkbox" checked />
          <h1 className="mdl-mega-footer__heading">Details</h1>
          <ul className="mdl-mega-footer__link-list">
            <li><a href="#">Specs</a></li>
            <li><a href="#">Tools</a></li>
            <li><a href="#">Resources</a></li>
          </ul>
        </div>

        <div className="mdl-mega-footer__drop-down-section">
          <input className="mdl-mega-footer__heading-checkbox" type="checkbox" checked />
          <h1 className="mdl-mega-footer__heading">Technology</h1>
          <ul className="mdl-mega-footer__link-list">
            <li><a href="#">How it works</a></li>
            <li><a href="#">Patterns</a></li>
            <li><a href="#">Usage</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Contracts</a></li>
          </ul>
        </div>

        <div className="mdl-mega-footer__drop-down-section">
          <input className="mdl-mega-footer__heading-checkbox" type="checkbox" checked />
          <h1 className="mdl-mega-footer__heading">FAQ</h1>
          <ul className="mdl-mega-footer__link-list">
            <li><a href="#">Questions</a></li>
            <li><a href="#">Answers</a></li>
            <li><a href="#">Contact us</a></li>
          </ul>
        </div>

      </div>

      <div className="mdl-mega-footer__bottom-section">
        <div className="mdl-logo">Title</div>
        <ul className="mdl-mega-footer__link-list">
          <li><a href="#">Help</a></li>
          <li><a href="#">Privacy & Terms</a></li>
        </ul>
      </div>

    </footer>
  )
}

export default class Layout extends Component {
  render () {
    return (
      <div className="mdl-layout mdl-js-layout">
        <Navigation />
        <Drawer />
        <main className="mdl-layout__content">
          <div className="mdl-snackbar mdl-js-snackbar">
            <div className="mdl-snackbar__text" />
            <button type="button" className="mdl-snackbar__action" />
          </div>
          {this.props.children}
        </main>
        {/* <Footer /> */}
      </div>
    )
  }
}
