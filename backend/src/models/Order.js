const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  modifiers: [{ type: String }],
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'served', 'completed', 'cancelled'],
    default: 'pending',
  },
  orderType: {
    type: String,
    enum: ['dine-in', 'takeaway'],
    default: 'dine-in',
  },
  tableNumber: {
    type: String,
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid',
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'online', 'none'],
    default: 'none',
  },
  staffId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

// Auto-generate a readable order number before saving
orderSchema.pre('validate', async function() {
  if (this.isNew && !this.orderNumber) {
    const count = await this.constructor.countDocuments();
    const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderNumber = `AK-${dateStr}-${(count + 1).toString().padStart(4, '0')}-${random}`;
  }
});

module.exports = mongoose.model('Order', orderSchema);
