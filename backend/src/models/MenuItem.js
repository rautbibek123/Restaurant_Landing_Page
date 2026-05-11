const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nepali: { type: String },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  badge: { type: String, default: null },
  isVegetarian: { type: Boolean, default: false },
  spicyLevel: { type: Number, default: 0 },
  image: { type: String },
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
