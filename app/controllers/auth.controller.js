'use strict'

const User = require('../schemas/user');

function authorize (req, user, next) {
  req.session.regenerate(() => {
    // Store the user's primary key
    // in the session store to be retrieved,
    // or in this case the entire user object
    req.session.userId = user._id;
    next();
  });
}

module.exports = {
  index (req, res) {
    res.render('./pages/auth', {
      title: 'Login'
    })
  },

  login (req, res) {
    let { email, password } = req.body;

    User.authenticate(email, password, (user) => {
      if (!user) return res.redirect('/auth');

      authorize(req, user, () => res.redirect('/'));
    });
  },

  signUp (req, res) {
    let { email, password, fullname } = req.body;

    let user = new User({ email, password, fullname });
    user.save();

    authorize(req, user, () => res.redirect('/'));
  }
}
