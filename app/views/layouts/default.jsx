import React, { Component } from 'react'

class DefaultLayout extends Component {
  render () {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" /> */}
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.red-blue.min.css" />
          {/* <link rel="stylesheet" href="/material.min.css" /> */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </head>
        <body>
          {this.props.children}
          <div id="devtools" />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js" />
          {/* <script src="/bundle.js"></script> */}
          <script src="/material.min.js" />
          <script src="http://localhost:8080/bundle.js"></script>
        </body>
      </html>
    )
  }
}

export default DefaultLayout
