const productController = require('../controllers/productController');
const express = require('express')

const productRouter = express.Router();

productRouter
    .get('products/list/all', productController.listAllProducts)
    .get('products/list/:id', productController.listOneProduct)
    .post('products/new', productController.createProduct)


module.exports = productRouter;