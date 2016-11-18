'use strict'

module.exports = {
  index (req, res) {
    res.render('./pages/auth', {
      title: 'Login'
    })
  }
}
