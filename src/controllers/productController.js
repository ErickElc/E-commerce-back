const productModel = require('../models/Product.js');

class productController{
    static async createProduct(req, res){
        const newProduct = new productModel(req.body);
        try {
            newProduct.save();
            res.status(201).send('Produto Criado!');
        } catch (error) {
            res.status(500).send('não foi possível criar o produto');
        }
    }
    static async listAllProducts (req, res){
        try {
            const allProducts = await productModel.find();
            res.status(200).send(allProducts);
        } catch (error) {
            res.status(400).send('Não foi possível listar os produtos!');
        }
    }
    static async listOneProduct(req, res){
        const id = req.params.id;
        try {
            const selectedProduct = await productModel.findOne({_id: id});
            res.status(200).send(selectedProduct);
        } catch (error) {
            res.status(404).send('Esse produto não existe');
        }
    }
}


module.exports = productController;