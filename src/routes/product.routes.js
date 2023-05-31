const { authAdmin } = require("../auth/auth");
const productController = require("../controllers/productController");
const express = require("express");

const productRouter = express.Router();

productRouter
  .get("/products/list/all", productController.listAllProducts)
  .get("/products/list/:id", productController.listOneProduct)
  .post("/products/new", authAdmin, productController.createProduct);

module.exports = productRouter;
