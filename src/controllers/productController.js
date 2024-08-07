const productModel = require("../models/Product.js");
const AuthUtils = require("../auth/utils.js");
const axios = require("axios");

class productController {

  static async listKiwifyProducts(req, res) {

    try {
      const authToken = await AuthUtils.generateTokenKiwify();
      const Options = {
        Authorization: `Bearer ${authToken.data.access_token}`,
        "x-kiwify-account-id": process.env.ACCOUNT_ID,
      };

      const getProducts = await axios.get(`${process.env.KIWIFY_API}/v1/products`, {headers: Options});
      res.status(200).send(getProducts.data);
      for(let product of getProducts.data.data){
        console.log(product)
      }
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  }

  static async createProduct(req, res) {
    const Product = new productModel({
      name: req.body.name,
      description: req.body.description,
      value: req.body.value,
      url_image: req.body.url_image,
    });
    try {
      const produto = await Product.save();
      res.status(201).send(produto);
    } catch (error) {
      res.status(500).send("não foi possível criar o produto" + error);
    }
  }
  static async updateProduct(req, res) {
    const id = req.params.id;

    try {
      const productSelect = await productModel.findOne({ _id: id });
      await productModel.findOneAndUpdate(
        { _id: id },
        {
          name: req.body.name ? req.body.name : productSelect.name,
          description: req.body.description
            ? req.body.description
            : productSelect.description,
          value: req.body.value ? req.body.value : productSelect.value,
          url_image: req.body.url_image
            ? req.body.url_image
            : productSelect.url_image,
        }
      );
      const productUpdated = await productModel.findOne({ _id: id });
      res.status(200).send(productUpdated);
    } catch (error) {
      res.status(404).send("Esse produto não existe");
    }
  }
  static async deleteProduct(req, res) {
    const id = req.params.id;
    try {
      await productModel.deleteOne({ _id: id });
      res.status(200).send("Produto deletado com sucesso!");
    } catch (error) {
      res.status(404).send("Esse produto não existe");
    }
  }

  static async listAllProducts(req, res) {
    try {
      const allProducts = await productModel.find();
      res.status(200).send(allProducts);
    } catch (error) {
      res.status(400).send("Não foi possível listar os produtos!");
    }
  }
  static async listOneProduct(req, res) {
    const id = req.params.id;
    try {
      const selectedProduct = await productModel.findOne({ _id: id });
      res.status(200).send(selectedProduct);
    } catch (error) {
      res.status(404).send("Esse produto não existe");
    }
  }
}

module.exports = productController;
