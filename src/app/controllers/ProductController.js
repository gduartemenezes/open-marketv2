import Product from '../models/Product';

class ProductController {
  async store(req, res) {
    return res.json({ ok: true });
  }
}

export default new ProductController();
