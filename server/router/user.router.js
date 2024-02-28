const { Router } = require('express');
// const { userController } = require('../controller/user.controller');
 const { userController } = require('../controller/user.controller');


const userRouter = Router();

// GET all users 
userRouter.get('/', userController.getAllUsers);
// GET user by id
userRouter.get('/:id', userController.getUserById);
// CREATE user
userRouter.post('/', userController.createUser);
// UPDATE user
userRouter.put('/:id', userController.updateUser);
// DELETE user
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter; // Export the router instance directly
