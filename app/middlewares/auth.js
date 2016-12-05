'use strict'

const User = require('../schemas/user');

module.exports = {
  /**
   * Redirects to login page if user is not authenticated
   */
  notAuthenticated (req, res, next) {
    if (req.session.userId) return next();
    res.redirect('/auth');
  },

  /**
   * Redirects to homepage if user is authenticated and requests
   * authentication page like login
   */
  authenticated (req, res, next) {
    if (req.session.userId) {
      req.session.error = 'Please login';
      return res.redirect('/');
    }

    next();
  }
}
