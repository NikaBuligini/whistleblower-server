import React from 'react';

const Footer = () => (
  <footer className="mdl-mega-footer">
    <div className="mdl-mega-footer__bottom-section">
      <div className="mdl-logo">Whistleblower</div>
      <ul className="mdl-mega-footer__link-list">
        <li>
          <a
            className="github-button"
            href="https://github.com/NikaBuligini/whistleblower-server"
            data-count-href="/NikaBuligini/whistleblower-server/stargazers"
            data-count-api="/repos/NikaBuligini/whistleblower-server#stargazers_count"
            data-count-aria-label="# stargazers on GitHub"
            aria-label="Star NikaBuligini/whistleblower-server on GitHub"
          >
            Star
          </a>
        </li>
        <li>
          <a
            href="https://github.com/NikaBuligini"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
