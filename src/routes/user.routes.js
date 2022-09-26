const express = require('express');
const userController = require('../controllers/userController');


const routerUsers = express.Router();


routerUsers
    .get('/users/list/all', userController.listAllUsers)
    .get('/users/list/:id', userController.listOneUser)
    .post('/users/new', userController.registerUser)
    .post('/users/login', userController.loginUser)

module.exports = routerUsers;