const userController = require("../controllers/userController");
const authMiddleware = require("../auth/middleware");
const express = require("express");

const routerUsers = express.Router();

routerUsers
  .get(
    "/users/list",
    authMiddleware.verifyAccessEmail,
    userController.userEmailData
  )
  .get(
    "/users/list/:id",
    authMiddleware.verifyAccess,
    userController.listOneUser
  )
  .post("/users/new", userController.registerUser)
  .post("/users/login", userController.loginUser)
  .put(
    "/users/update/:id",
    authMiddleware.verifyAccess,
    userController.updateUserData
  )
  .delete(
    "/users/delete/:id",
    authMiddleware.verifyAccess,
    userController.deleteUser
  );

module.exports = routerUsers;
