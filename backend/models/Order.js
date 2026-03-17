const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  productId: String,
  amount: Number,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
