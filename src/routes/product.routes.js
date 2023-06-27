const middlewareController = require("../auth/middleware");
const productController = require("../controllers/productController");
const express = require("express");

const productRouter = express.Router();

productRouter
  .get("/products/list/all", productController.listAllProducts)
  .get("/products/list/:id", productController.listOneProduct)
  .post(
    "/products/new",
    middlewareController.verifyAdmin,
    productController.createProduct
  )
  .put(
    "/products/update/:id",
    middlewareController.verifyAdmin,
    productController.updateProduct
  )
  .delete(
    "/products/delete/:id",
    middlewareController.verifyAdmin,
    productController.deleteProduct
  );

module.exports = productRouter;
