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
}

export default new UserController();
