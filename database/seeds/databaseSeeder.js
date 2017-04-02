import { UserSchema as User } from '../../app/graph/models/schemas';

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
