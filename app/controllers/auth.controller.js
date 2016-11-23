'use strict'

const User = require('../schemas/user');

module.exports = {
  index (req, res) {
    res.render('./pages/auth', {
      title: 'Login'
    })
  },

  login (req, res) {
    let { email, password } = req.body;

    User.find({ email, password })
      .exec()
      .then((user) => {
        if (!user) {
          res.redirect('/auth');
        }

        res.redirect('/');
      })
      .catch((err) => {
        res.redirect('/auth');
      });
  },

  signUp (req, res) {
    let { email, password } = req.body;

    let user = new User({
      email,
      password
    });
    user.save();

    res.redirect('/');
  }
}
