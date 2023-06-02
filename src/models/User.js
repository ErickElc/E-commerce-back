const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  cpf: {
    type: String,
    required: true,
    unique: true,
    default: "000.000.000-00",
  },
  age: { type: Number, required: true, default: 0 },
  phoneNumber: { type: String, required: true, default: "(00) 00000-0000" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now() },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
