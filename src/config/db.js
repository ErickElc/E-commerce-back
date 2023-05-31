const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:admin@data.mdkhw5h.mongodb.net/data?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;

module.exports = db;
