import { UserSchema as User } from '../graph/models/schemas';

/**
 * Redirects to login page if user is not authenticated
 */
export function notAuthenticated(req, res, next) {
  const { userId } = req.session;
  if (userId) {
    User.getById(userId).then((user) => {
      /* eslint no-param-reassign: ["error", { "props": false }]*/
      req.user = user;
      next();
    });
  } else {
    res.redirect('/auth');
  }
}

/**
 * Redirects to homepage if user is authenticated and requests
 * authentication page like login
 */
export function authenticated(req, res, next) {
  const { session } = req;
  if (session.userId) {
    session.error = 'Please login';
    return res.redirect('/');
  }

  return next();
}
