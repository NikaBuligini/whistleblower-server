require('../../app/schemas/project');
require('../../app/schemas/service');
const User = require('../../app/schemas/user');

function seed() {
  User.findOne({ roles: 'admin' })
    .exec()
    .then((user) => {
      if (!user) {
        console.log('seeding...');
        const admin = new User({
          fullname: 'Nikoloz Buligini',
          email: 'nbuligini11@gmail.com',
          password: 'asd',
        });
        admin.roles.push('admin');
        admin.save();
        console.log('admin user created');
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = seed;
