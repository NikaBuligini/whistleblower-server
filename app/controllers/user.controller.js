const User = require('../schemas/user');

module.exports = {
  getAll(req, res) {
    User.getAll()
      .then((users) => {
        if (!users) {
          return res.status(500).json({ message: 'users doesn\'t exist!' });
        }

        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
};
