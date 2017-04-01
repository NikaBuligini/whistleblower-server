import React from 'react';

function DefaultLayout(props) {
  const { title, user } = props;
  const host = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '';
  const preloaded = user ? {
    id: user.id,
    name: user.fullname,
    roles: user.roles,
  } : false;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" /> */}
        <title>{title}</title>
        <link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.red-blue.min.css" />
        {/* <link rel="stylesheet" href="/material.min.css" /> */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href={`${host}/main.min.css`} />
      </head>
      <body>
        {props.children}
        <div id="devtools" />
        {preloaded && <input type="hidden" id="preloaded" value={JSON.stringify(preloaded)} />}
        {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js" /> */}
        <script async defer src="https://buttons.github.io/buttons.js" />
        <script src="/material.min.js" />
        <script src={`${host}/vendor.min.js`} />
        <script src={`${host}/bundle.js`} />
      </body>
    </html>
  );
}

DefaultLayout.propTypes = {
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
  user: React.PropTypes.shape({
    roles: React.PropTypes.arrayOf(React.PropTypes.string),
  }),
};

export default DefaultLayout;
