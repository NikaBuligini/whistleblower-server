module.exports = {
  /**
   * Redirects to login page if user is not authenticated
   */
  notAuthenticated(req, res, next) {
    if (req.session.userId) return next();
    return res.redirect('/auth');
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
