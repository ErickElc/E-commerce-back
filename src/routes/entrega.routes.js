const entregaController = require('../controllers/entregaController');
const express = require('express');



router = express.Router();


router
    .get("/entregas/valor/:id", entregaController.precoPrazoProduto)
   
 

module.exports = router;