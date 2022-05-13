const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');

const checkUrl = (url) => {
  if (!isUrl(url, { require_protocol: true })) {
    throw new Error('Невалидная ссылка');
  }
  return url;
};

const userValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(checkUrl, 'avatar link validation'),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const userUpdateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const avatarUpdateValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(checkUrl, 'avatar link validation'),
  }),
});

module.exports = {
  userValidator,
  userUpdateValidator,
  avatarUpdateValidator,
  userIdValidator,
};
