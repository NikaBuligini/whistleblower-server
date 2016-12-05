'use strict'

const Project = require('../../app/schemas/project');
const Service = require('../../app/schemas/service');
const User = require('../../app/schemas/user');

module.exports = function () {
  User.findOne({ roles: 'admin' })
    .exec()
    .then(user => {
      if (!user) {
        console.log('seeding...');
        user = new User({
          fullname: 'Nikoloz Buligini',
          email: 'nbuligini11@gmail.com',
          password: 'asd'
        });
        user.roles.push('admin');
        user.save();
        console.log('admin user created');
      }
    })
    .catch(err => {
      console.error(err);
    })
}
