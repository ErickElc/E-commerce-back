const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    nameProduct:{type: String, required: true},
    description:{type: String, required: true},
    productValue: {type: Number, required: true}
});
const productModel = mongoose.model('product',  productSchema);
module.exports = productModel;