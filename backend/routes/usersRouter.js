const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.route('/')
.get(userController.getUsers)
.post(userController.createUser)

router.route('/:id')
.get(userController.getUserById)
.put(userController.updateUserById)
.delete(userController.deleteUserById);

module.exports = router;