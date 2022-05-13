const router = require('express').Router();
const {
  userUpdateValidator,
  avatarUpdateValidator,
  userIdValidator,
} = require('../middlewares/userValidator');
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/userController');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userIdValidator, getUserById);
router.patch('/me', userUpdateValidator, updateUser);
router.patch('/me/avatar', avatarUpdateValidator, updateUserAvatar);

module.exports = router;
