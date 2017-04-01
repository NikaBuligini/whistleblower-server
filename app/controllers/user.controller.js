import User from '../schemas/user';

export default function getAll(req, res) {
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
}
