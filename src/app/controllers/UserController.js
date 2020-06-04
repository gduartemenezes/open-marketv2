import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email, password, passwordConfirmation } = req.body;

    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(401).json({ error: 'Email already in use' });
    }

    if (password !== passwordConfirmation) {
      return res.status(401).json({ error: "Passwords aren't equal" });
    }

    const { name, provider } = await User.create(req.body);

    return res.json({
      user: {
        name,
        email,
        provider,
      },
    });
  }

  async update(req, res) {
    const user = await User.findByPk(req.userId);
    const { email, oldPassword } = req.body;

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists)
        return res.status(401).json({ error: 'Email already in use' });
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name, provider } = await user.update(req.body);
    return res.json({
      user: {
        id,
        name,
        email,
        provider,
      },
    });
  }
}

export default new UserController();
