const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true
  },
  details: {
    type: String
  },
  orderId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order'
  },
  ip: String
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
