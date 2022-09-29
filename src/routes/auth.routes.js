const express = require('express');
const authController = require('../controllers/authController');


router = express.Router();


router
    .post("/free", authController.authController)
    .post("/admin", authController.authAdmin)
    .post("/private/free/:id", authController.authPrivatePage)
 

module.exports = router;