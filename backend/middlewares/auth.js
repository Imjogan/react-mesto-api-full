require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');
const { authorizationRequired } = require('../utils/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError(authorizationRequired));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new AuthError(authorizationRequired));
  }
  req.user = payload;
  next();
};
