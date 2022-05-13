const router = require('express').Router();
const { cardValidator, cardIdValidator } = require('../middlewares/cardValidator');
const {
  createCard,
  getCards,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cardController');

router.get('/', getCards);
router.delete('/:cardId', cardIdValidator, deleteCard);
router.post('/', cardValidator, createCard);
router.put('/:cardId/likes', cardIdValidator, putLike);
router.delete('/:cardId/likes', cardIdValidator, deleteLike);

module.exports = router;
