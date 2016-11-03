'use strict'

module.exports = {
  homepage (req, res) {
    res.render('./pages/home', {
      title: 'React test'
    })
  }
}
