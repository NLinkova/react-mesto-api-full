const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');

const checkUrl = (url) => {
  if (!isUrl(url, { require_protocol: true })) {
    throw new Error('Невалидная ссылка');
  }

  return url;
};

const cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(checkUrl, 'image link validation'),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  cardValidator,
  cardIdValidator,
};
