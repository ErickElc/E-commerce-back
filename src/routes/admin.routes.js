const adminController = require("../controllers/adminController");
const authMiddleware = require("../auth/middleware");
const express = require("express");

const adminRouter = express.Router();

adminRouter
  .get(
    "/admin/get-all",
    authMiddleware.verifyAdmin,
    adminController.getAllUsers
  )
  .get(
    "/admin/get-one/:id",
    authMiddleware.verifyAdmin,
    adminController.getOneUser
  )
  .get(
    "/admin/get-list-admins",
    authMiddleware.verifyAdmin,
    adminController.getListOfAdmins
  )
  .delete(
    "/admin/delete-user/:id",
    authMiddleware.verifyAdmin,
    adminController.removeUser
  );

module.exports = adminRouter;
