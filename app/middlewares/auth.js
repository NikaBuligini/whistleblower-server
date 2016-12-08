const User = require('../schemas/user');

module.exports = {
  /**
   * Redirects to login page if user is not authenticated
   */
  notAuthenticated(req, res, next) {
    const { userId } = req.session;
    if (userId) {
      User.getById(userId)
        .then((user) => {
          /* eslint no-param-reassign: ["error", { "props": false }]*/
          req.user = user;
          next();
        });
    } else {
      res.redirect('/auth');
    }
  },

  /**
   * Redirects to homepage if user is authenticated and requests
   * authentication page like login
   */
  authenticated(req, res, next) {
    const { session } = req;
    if (session.userId) {
      session.error = 'Please login';
      return res.redirect('/');
    }

    return next();
  },
};
