const express = require("express");
const paymentController = require('../controllers/pagamentoController')

router = express.Router();

router
  .post("/payment-webhook", paymentController.paymentWebHook);

module.exports = router;
