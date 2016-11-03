import React from 'react'

class DefaultLayout extends React.Component {
  render () {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" /> */}
          <link rel="mask-icon" sizes="any" href="/svg/favicon.svg" color="#55acee" />
          <link rel="icon" href="/svg/favicon.ico" type="image/x-icon" />
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossOrigin="anonymous" />
          <link rel="stylesheet" href="/css/font-awesome.min.css" />
          <link rel="stylesheet" type="text/css" href="/css/app.css" />
        </head>
        <body>
          <div>
            <div className="page-outer">
              <div className="app-content wrapper wrapper-home">
                {this.props.children}
              </div>
            </div>
          </div>
          <div id="devtools" />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossOrigin="anonymous"></script>
          <script src="/js/bundle.js"></script>
        </body>
      </html>
    )
  }
}

export default DefaultLayout
