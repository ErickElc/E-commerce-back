const userController = require("../controllers/userController");
const authMiddleware = require("../auth/middleware");
const express = require("express");

const routerUsers = express.Router();

routerUsers
  //   FEITO
  .get(
    "/users/list-all",
    authMiddleware.verifyAdmin,
    userController.listAllUsers
  )
  .get(
    "/users/list",
    authMiddleware.verifyAccessEmail,
    userController.userEmailData
  )
  //   FEITO
  .get(
    "/users/list/:id",
    authMiddleware.verifyAccess,
    userController.listOneUser
  )
  // FEITO
  .post("/users/new", userController.registerUser)
  //   FEITO
  .post("/users/login", userController.loginUser);

module.exports = routerUsers;
