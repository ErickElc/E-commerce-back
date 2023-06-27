const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  value: { type: String, required: true },
  url_image: { type: String, required: true },
  createdDate: { type: Date, default: Date.now() },
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
