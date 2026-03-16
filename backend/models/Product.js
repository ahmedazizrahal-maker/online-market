const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }, // in cents
  description: { type: String },
  image: { type: String },
  stock: { type: Number, default: 0 },
  source: { type: String, default: 'local' }, // local, ebay, etc.
  externalId: { type: String }, // id from external platform
  lastSyncedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);