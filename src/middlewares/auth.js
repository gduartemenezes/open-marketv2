import jwt from 'jsonwebtoken';
import promisify from 'util';

import authConfig from '../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.uthorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'You have no authorization to access this page' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    console.log(decoded);
    return next();
  } catch (err) {
    return res.status(400).json(err);
  }
};
