const Card = require('../models/cardModel');
const ErrorForbidden = require('../errors/ErrorForbidden');
const ErrorNotFound = require('../errors/ErrorNotFound');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById({ _id: cardId })
    .orFail(() => {
      throw new ErrorNotFound('Такой карточки не существует');
    })
    .then((card) => {
      if (card.owner.toString() !== userId) {
        throw new ErrorForbidden('Вы не можете удалять чужие карточки');
      }
      return Card.findByIdAndRemove(card._id);
    })
    .then((card) => {
      res.send({ message: 'Успешно удалена карточка:', data: card });
    })
    .catch(next);
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrorNotFound('Такой карточки не существует');
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrorNotFound('Такой карточки не существует');
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};
