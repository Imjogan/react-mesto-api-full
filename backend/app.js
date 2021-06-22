const validator = require('validator');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');
const { requestedResourceNotFoundError } = require('./utils/errors');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { mongoosePreset } = require('./utils/constants');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const options = {
  origin: [
    'http://localhost:3000',
    'http://84.252.137.18',
    'https://84.252.137.18',
    'http://mesto.mjogan.nomoredomains.club',
    'https://mesto.mjogan.nomoredomains.club',
    'http://api.mesto.mjogan.nomoredomains.club',
    'https://api.mesto.mjogan.nomoredomains.club',
    'https://imjogan.github.io/react-mesto-auth',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', mongoosePreset);

// подключаем логгер запросов
app.use(requestLogger);

app.use('*', cors(options));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      password: Joi.string().required().min(8),
      email: Joi.string().required().email(),
    }),
  }),
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      password: Joi.string().required().min(8),
      email: Joi.string().required().email(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom((value, helper) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          return helper.message('Вы должны указать ссылку');
        }
        return value;
      }),
    }),
  }),
  createUser,
);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// подключаем логгер ошибок
app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError(requestedResourceNotFoundError));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? 'Произошла ошибка на стороне сервера' : message,
  });
});

app.listen(PORT);
