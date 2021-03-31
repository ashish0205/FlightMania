const mongoose = require("mongoose");
const schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
});

const prd = mongoose.model("productss", productSchema);

module.exports = prd;
