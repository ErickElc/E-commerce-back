const express = require('express');
const authController = require('../controllers/authController');


router = express.Router();


router
    .post("/free", authController.authController)
 

module.exports = router;