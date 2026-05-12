const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
    default: 4,
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'reserved', 'cleaning'],
    default: 'available',
  },
  section: {
    type: String,
    enum: ['indoor', 'outdoor', 'window', 'booth'],
    default: 'indoor',
  },
  currentOrder: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order',
  }
}, { timestamps: true });

module.exports = mongoose.model('Table', tableSchema);
