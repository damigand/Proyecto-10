const userRouter = require('express').Router();
const controller = require('../controllers/user');
const { isAuth } = require('../../middlewares/auth');

userRouter.get('/', controller.getAllUsers);
userRouter.get('/:id', controller.getUserById);
userRouter.post('/register', controller.register);
userRouter.post('/login', controller.login);
userRouter.put('/edit/:id', isAuth, controller.editUser);
userRouter.delete('/delete/:id', isAuth, controller.deleteUser);

module.exports = userRouter;
