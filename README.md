# Whistleblower-server

[![build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![npm](https://img.shields.io/badge/npm-3.8.9-blue.svg)]()
[![node](https://img.shields.io/badge/node-6.2.0-yellow.svg)]()

Monitoring system for your applications

## Installation

The easiest way to get started with whistleblower-server is to clone repository to your local machine. After cloning run this command from root directory of the project:

```{engine='sh'}
npm install
npm run build
npm start
```

whistleblower-server is using mongoDB as database, so you will need to install it from this [link](https://www.mongodb.com/). Probably you will need to install some UI for your database. I use [Robomongo](https://robomongo.org/) for this.

## Contribution

As a contributor you will need to install some additional packages globally. So you will need to run this commands from your terminal (add `sudo` for every command if your OS is linux):

```{engine='sh'}
npm install -g webpack
npm install -g webpack-dev-server
```

Now all you need for starting server is to run next commands from your root project:

```{engine='sh'}
npm run watch
npm start
```
