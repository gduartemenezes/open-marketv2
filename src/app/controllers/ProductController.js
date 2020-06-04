import * as Yup from 'yup';
import Product from '../models/Product';
import User from '../models/User';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      value: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data, try again' });
    }
    const user = await User.findByPk(req.userId);
    if (!user.provider) {
      return res.status(401).json({
        error:
          'Only providers can post products, update your profile and come back',
      });
    }
    const { name, description, value } = req.body;
    const product = await Product.create({
      user_id: req.userId,
      name,
      description,
      value,
    });

    return res.json({ product });
  }
}

export default new ProductController();
