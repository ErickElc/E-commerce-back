const express = require("express");
const authController = require("../auth/auth");

router = express.Router();

router
  .get("/verify-token", authController.verifyToken)
  .get("/on-access/", authController.verifyAccessEmail)
  .get("/admin/:id", authController.authAdmin)
  .get("/on-access/:id", authController.verifyAccess);

module.exports = router;
